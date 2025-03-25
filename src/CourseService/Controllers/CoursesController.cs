using AutoMapper;
using AutoMapper.QueryableExtensions;
using CourseService.Data;
using CourseService.DTOs;
using CourseService.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CourseService.Controllers;

[ApiController]
[Route("api/courses")]
public class CoursesController : ControllerBase
{
    private readonly CourseDbContext _context;
    private readonly IMapper _mapper;

    public CoursesController(CourseDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<List<CourseDto>>> GetAllCourses(string date)
    {

        var query = _context.Courses.OrderBy(x => x.Item.CourseTitle).AsQueryable();

        if(!string.IsNullOrEmpty(date))
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

    [HttpPost]
    public async Task<ActionResult<CourseDto>> CreateCourse(CreateCourseDto courseDto)
    {
        var course = _mapper.Map<Course>(courseDto);
        // TODO : add current user as publisher
        course.Publisher = "test";

        _context.Courses.Add(course);

        var result = await _context.SaveChangesAsync() > 0;

        if (!result) return BadRequest("Could not save changes to Database");

        return CreatedAtAction(nameof(GetCourseById), new { course.Id }, _mapper.Map<CourseDto>(course));
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateCourse(Guid id, UpdateCourseDto updateCourseDto)
    {
        var course = await _context.Courses.Include(x => x.Item)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (course == null) return NotFound();

        //TODO: check seller == username

        course.Item.CourseTitle = updateCourseDto.CourseTitle ?? course.Item.CourseTitle;
        course.Item.Instructor = updateCourseDto.Instructor ?? course.Item.Instructor;
        course.Item.Description = updateCourseDto.Description ?? course.Item.Description;
        course.Item.Level = updateCourseDto.Level ?? course.Item.Level;
        course.Item.CoursePrice = updateCourseDto.CoursePrice ?? course.Item.CoursePrice;

        var result = await _context.SaveChangesAsync() > 0;

        if (result) return Ok();

        return BadRequest("Could not save changes");
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteCourse(Guid id)
    {
        var course = await _context.Courses.FindAsync(id);

        if(course == null) return NotFound();

        //TODO: check seller is == username

        _context.Courses.Remove(course);

        var result = await _context.SaveChangesAsync() > 0;

        if(!result) return BadRequest("Could not update DB");

        return Ok();
    }

}