using AutoMapper;
using AutoMapper.QueryableExtensions;
using Contracts;
using CourseService.Data;
using CourseService.DTOs;
using CourseService.Entities;
using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CourseService.Controllers;

[ApiController]
[Route("api/courses")]
public class CoursesController : ControllerBase
{
    private readonly CourseDbContext _context;
    private readonly IMapper _mapper;
    private readonly IPublishEndpoint _publishEndpoint;

    public CoursesController(CourseDbContext context, IMapper mapper, IPublishEndpoint publishEndpoint)
    {
        _context = context;
        _mapper = mapper;
        _publishEndpoint = publishEndpoint;
    }

    [HttpGet]
    public async Task<ActionResult<List<CourseDto>>> GetAllCourses(string date)
    {

        var query = _context.Courses.OrderBy(x => x.Item.CourseTitle).AsQueryable();

        if (!string.IsNullOrEmpty(date))
        {
            query = query.Where(x => x.LastUpdatedAt.CompareTo(DateTime.Parse(date).ToUniversalTime()) > 0);
        }

        return await query.ProjectTo<CourseDto>(_mapper.ConfigurationProvider).ToListAsync();

    }


    [HttpGet("{id}")]
    public async Task<ActionResult<CourseDto>> GetCourseById(Guid id)
    {
        var course = await _context.Courses
            .Include(x => x.Item)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (course == null) return NotFound();

        return _mapper.Map<CourseDto>(course);

    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<CourseDto>> CreateCourse(CreateCourseDto courseDto)
    {
        var course = _mapper.Map<Course>(courseDto);

        course.Publisher = User.Identity.Name;

        _context.Courses.Add(course);

        var newCourse = _mapper.Map<CourseDto>(course);

        await _publishEndpoint.Publish(_mapper.Map<CoursePublished>(newCourse));

        var result = await _context.SaveChangesAsync() > 0;

        if (!result) return BadRequest("Could not save changes to Database");

        return CreatedAtAction(nameof(GetCourseById), new { course.Id }, _mapper.Map<CourseDto>(course));
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateCourse(Guid id, UpdateCourseDto updateCourseDto)
    {
        var course = await _context.Courses.Include(x => x.Item)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (course == null) return NotFound();

        if (course.Publisher != User.Identity.Name)
        {
            return Forbid();
        }

        course.Item.CourseTitle = updateCourseDto.CourseTitle ?? course.Item.CourseTitle;
        course.Item.Instructor = updateCourseDto.Instructor ?? course.Item.Instructor;
        course.Item.Description = updateCourseDto.Description ?? course.Item.Description;
        course.Item.CoursePrice = updateCourseDto.CoursePrice ?? course.Item.CoursePrice;

        await _publishEndpoint.Publish(_mapper.Map<CourseUpdated>(course));

        var result = await _context.SaveChangesAsync() > 0;

        if (result) return Ok();

        return BadRequest("Could not save changes");
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteCourse(Guid id)
    {
        var course = await _context.Courses.FindAsync(id);

        if (course == null) return NotFound();

        if (course.Publisher != User.Identity.Name)
        {
            return Forbid();
        }

        _context.Courses.Remove(course);

        await _publishEndpoint.Publish<CourseDeleted>(new { Id = course.Id.ToString() });

        var result = await _context.SaveChangesAsync() > 0;

        if (!result) return BadRequest("Could not update DB");

        return Ok();
    }

}