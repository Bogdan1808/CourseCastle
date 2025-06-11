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
using System.Security.Claims;


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

    [Authorize]
    [HttpGet("owned")]
    public async Task<ActionResult<List<CourseDto>>> GetOwnedCourses()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        var query = _context.Courses
            .Include(c => c.UserCourses)
            .Where(c => c.UserCourses.Any(uc => uc.UserId == userId && uc.Ownership == Ownership.Owned))
            .OrderBy(x => x.Item.CourseTitle);

        return await query.ProjectTo<CourseDto>(_mapper.ConfigurationProvider).ToListAsync();
    }

    [Authorize]
    [HttpGet("wishlist")]
    public async Task<ActionResult<List<CourseDto>>> GetWishlistedCourses()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        var query = _context.Courses
            .Include(c => c.UserCourses)
            .Where(c => c.UserCourses.Any(uc => uc.UserId == userId && uc.Ownership == Ownership.Wishlisted))
            .OrderBy(x => x.Item.CourseTitle);

        return await query.ProjectTo<CourseDto>(_mapper.ConfigurationProvider).ToListAsync();
    }

    [Authorize]
    [HttpPost("wishlist/{id}")]
    public async Task<ActionResult> WishlistCourse(Guid id)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        var existingUserCourse = await _context.UserCourses
            .FirstOrDefaultAsync(uc => uc.UserId == userId && uc.CourseId == id);

        if (existingUserCourse != null)
        {
            if (existingUserCourse.Ownership == Ownership.Owned)
            {
                return BadRequest("You already own this course");
            }

            if (existingUserCourse.Ownership == Ownership.Wishlisted)
            {
                return BadRequest("Course is already in your wishlist");
            }
        }

        var userCourse = new UserCourse
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            CourseId = id,
            Ownership = Ownership.Wishlisted,
            Status = Status.NotStarted
        };

        _context.UserCourses.Add(userCourse);
        await _context.SaveChangesAsync();

        return Ok("Course added to wishlist");
    }

    [Authorize]
    [HttpGet("usercoursestatus/{id}")]
    public async Task<ActionResult<UserCourseStatusDto>> GetUserCourseStatus(Guid id)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        var userCourse = await _context.UserCourses
            .FirstOrDefaultAsync(uc => uc.UserId == userId && uc.CourseId == id);

        if (userCourse == null)
        {
            return NotFound("No relationship found between user and course");
        }

        var result = new UserCourseStatusDto
        {
            CourseId = userCourse.CourseId,
            UserId = userCourse.UserId,
            Ownership = userCourse.Ownership.ToString(),
            Status = userCourse.Status.ToString()
        };

        return Ok(result);
    }
    
    [Authorize]
    [HttpDelete("wishlist/{id}")]
    public async Task<ActionResult> RemoveFromWishlist(Guid id)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        var existingUserCourse = await _context.UserCourses
            .FirstOrDefaultAsync(uc => uc.UserId == userId && uc.CourseId == id);

        if (existingUserCourse == null)
        {
            return BadRequest("Course is not in your list");
        }

        if (existingUserCourse.Ownership == Ownership.Owned)
        {
            return BadRequest("Cannot remove owned course from your library");
        }

        if (existingUserCourse.Ownership != Ownership.Wishlisted)
        {
            return BadRequest("Course is not in your wishlist");
        }

        _context.UserCourses.Remove(existingUserCourse);
        await _context.SaveChangesAsync();

        return Ok("Course removed from wishlist");
    }
}