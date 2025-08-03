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
    private readonly CloudinaryService _cloudinaryService;

    public CoursesController(CourseDbContext context, IMapper mapper, IPublishEndpoint publishEndpoint, CloudinaryService cloudinaryService)
    {
        _context = context;
        _mapper = mapper;
        _publishEndpoint = publishEndpoint;
        _cloudinaryService = cloudinaryService;
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
    public async Task<ActionResult<CourseDto>> CreateCourse([FromForm] CreateCourseDto courseDto)
    {
        string imageUrl = null, imagePublicId = null;
        string videoUrl = null, videoPublicId = null;

        try
        {
            if (courseDto.ImageFile != null)
            {
                var imageResult = await _cloudinaryService.UploadImageAsync(courseDto.ImageFile);
                imageUrl = imageResult.SecureUrl.ToString();
                imagePublicId = imageResult.PublicId;
                Console.WriteLine($"Image uploaded: {imageUrl}");
            }

            if (courseDto.VideoFile != null)
            {
                var videoResult = await _cloudinaryService.UploadVideoAsync(courseDto.VideoFile);
                videoUrl = videoResult.SecureUrl.ToString();
                videoPublicId = videoResult.PublicId;
                Console.WriteLine($"Video uploaded: {videoUrl}");

                if (videoResult.Duration > 0)
                {
                    var duration = TimeSpan.FromSeconds(videoResult.Duration);
                    courseDto.Duration = new TimeOnly(duration.Hours, duration.Minutes, duration.Seconds);
                }
            }

            var course = _mapper.Map<Course>(courseDto);
            course.Publisher = User.Identity.Name;

            if (course.Item != null)
            {
                course.Item.ImageUrl = imageUrl;
                course.Item.ImagePublicId = imagePublicId;
                course.Item.VideoUrl = videoUrl;
                course.Item.VideoPublicId = videoPublicId;
            }

            _context.Courses.Add(course);

            var newCourse = _mapper.Map<CourseDto>(course);
            await _publishEndpoint.Publish(_mapper.Map<CoursePublished>(newCourse));

            var result = await _context.SaveChangesAsync() > 0;
            if (!result) return BadRequest("Could not save changes to Database");

            Console.WriteLine($"Course created successfully: {course.Id}");
            return CreatedAtAction(nameof(GetCourseById), new { course.Id }, newCourse);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Course creation failed: {ex.Message}");

            if (!string.IsNullOrEmpty(imagePublicId))
            {
                await _cloudinaryService.DeleteFileAsync(imagePublicId);
                Console.WriteLine($"Cleaned up image: {imagePublicId}");
            }
            if (!string.IsNullOrEmpty(videoPublicId))
            {
                await _cloudinaryService.DeleteFileAsync(videoPublicId);
                Console.WriteLine($"Cleaned up video: {videoPublicId}");
            }

            return StatusCode(500, new { message = "Course creation failed", error = ex.Message });
        }
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateCourse(Guid id, [FromForm] UpdateCourseDto updateCourseDto)
    {
        var course = await _context.Courses
            .Include(x => x.Item)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (course == null) return NotFound();

        if (course.Publisher != User.Identity.Name)
        {
            return Forbid();
        }

        if (!string.IsNullOrWhiteSpace(updateCourseDto.CourseTitle))
            course.Item.CourseTitle = updateCourseDto.CourseTitle;
        if (!string.IsNullOrWhiteSpace(updateCourseDto.Instructor))
            course.Item.Instructor = updateCourseDto.Instructor;
        if (!string.IsNullOrWhiteSpace(updateCourseDto.Description))
            course.Item.Description = updateCourseDto.Description;
        if (updateCourseDto.CoursePrice.HasValue)
            course.Item.CoursePrice = updateCourseDto.CoursePrice.Value;

        if (updateCourseDto.ImageFile != null)
        {
            if (!string.IsNullOrEmpty(course.Item.ImagePublicId))
            {
                await _cloudinaryService.DeleteFileAsync(course.Item.ImagePublicId);
                Console.WriteLine($"Old image deleted: {course.Item.ImagePublicId}");
            }

            var imageUploadResult = await _cloudinaryService.UploadImageAsync(updateCourseDto.ImageFile);
            if (imageUploadResult == null || string.IsNullOrEmpty(imageUploadResult.SecureUrl.ToString()))
            {
                return StatusCode(500, "Failed to upload new image.");
            }
            course.Item.ImageUrl = imageUploadResult.SecureUrl.ToString();
            course.Item.ImagePublicId = imageUploadResult.PublicId;
            Console.WriteLine($"New image uploaded: {course.Item.ImageUrl}");
        }

        if (updateCourseDto.VideoFile != null)
        {
            if (!string.IsNullOrEmpty(course.Item.VideoPublicId))
            {
                await _cloudinaryService.DeleteFileAsync(course.Item.VideoPublicId);
                Console.WriteLine($"Old video deleted: {course.Item.VideoPublicId}");
            }

            var videoUploadResult = await _cloudinaryService.UploadVideoAsync(updateCourseDto.VideoFile);
            if (videoUploadResult == null || string.IsNullOrEmpty(videoUploadResult.SecureUrl.ToString()))
            {
                return StatusCode(500, "Failed to upload new video.");
            }
            course.Item.VideoUrl = videoUploadResult.SecureUrl.ToString();
            course.Item.VideoPublicId = videoUploadResult.PublicId;
            Console.WriteLine($"New video uploaded: {course.Item.VideoUrl}");

            if (videoUploadResult.Duration > 0)
            {
                var duration = TimeSpan.FromSeconds(videoUploadResult.Duration);
                course.Item.Duration = new TimeOnly(duration.Hours, duration.Minutes, duration.Seconds);
            }
        }

        await _publishEndpoint.Publish(_mapper.Map<CourseUpdated>(course));
        Console.WriteLine($"CourseUpdated message published for Course ID: {course.Id}");

        var result = await _context.SaveChangesAsync() > 0;

        if (result)
        {
            Console.WriteLine($"Changes saved to database for Course ID: {course.Id}");
            return Ok();
        }
        else
        {
            Console.WriteLine($"Failed to save changes to database for Course ID: {course.Id}");
            return BadRequest("Could not save changes");
        }
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
            return Ok(new UserCourseStatusDto
            {
                CourseId = id,
                UserId = userId,
                Ownership = "None",
                Status = "None"
            });
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

    [Authorize]
    [HttpPut("start/{id}")]
    public async Task<ActionResult> StartCourse(Guid id)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        var existingUserCourse = await _context.UserCourses
            .FirstOrDefaultAsync(uc => uc.UserId == userId && uc.CourseId == id);

        if (existingUserCourse != null)
        {
            if (existingUserCourse.Ownership == Ownership.Owned && existingUserCourse.Status == Status.NotStarted)
            {
                existingUserCourse.Status = Status.Started;
            }
        }

        await _context.SaveChangesAsync();

        return Ok("Course Started");
    }

    [Authorize]
    [HttpPut("finish/{id}")]
    public async Task<ActionResult> FinishCourse(Guid id)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        var existingUserCourse = await _context.UserCourses
            .FirstOrDefaultAsync(uc => uc.UserId == userId && uc.CourseId == id);

        if (existingUserCourse != null)
        {
            if (existingUserCourse.Ownership == Ownership.Owned && existingUserCourse.Status == Status.Started)
            {
                existingUserCourse.Status = Status.Finished;
            }
        }

        await _context.SaveChangesAsync();

        return Ok("Course finished, congratulations!");
    }

    [HttpGet("{id}/reviews")]
    public async Task<ActionResult<object>> GetReviews(Guid id)
    {
        var course = await _context.Courses
            .Include(c => c.Reviews)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (course == null)
            return NotFound();

        var reviews = course.Reviews
            .Select(r => new ReviewDto
            {
                Id = r.Id,
                UserId = r.UserId,
                CourseId = r.CourseId,
                UserName = r.UserName,
                Rating = r.Rating,
                Comment = r.Comment,
                CreatedAt = r.CreatedAt
            })
            .ToList();

        double avgRating = reviews.Any() ? Math.Round(reviews.Average(r => r.Rating), 2) : 0;

        return Ok(new { reviews, averageRating = avgRating });
    }

    [Authorize]
    [HttpPost("{id}/reviews")]
    public async Task<ActionResult> AddReview(Guid id, [FromBody] CreateReviewDto dto)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var userName = User.Identity.Name;

        var userCourse = await _context.UserCourses
            .FirstOrDefaultAsync(uc => uc.UserId == userId && uc.CourseId == id && uc.Ownership == Ownership.Owned);

        if (userCourse == null)
            return Forbid("You can only review courses you own.");

        var course = await _context.Courses
            .Include(c => c.Item)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (course == null)
            return NotFound();

        var review = new Review
        {
            Id = Guid.NewGuid(),
            CourseId = id,
            UserId = userId,
            UserName = userName,
            Rating = dto.Rating,
            Comment = dto.Comment,
            CreatedAt = DateTime.UtcNow
        };

        _context.Reviews.Add(review);

        var existingRatings = await _context.Reviews
            .Where(r => r.CourseId == id)
            .Select(r => r.Rating)
            .ToListAsync();

        existingRatings.Add(dto.Rating);
        var newAverage = Math.Round(existingRatings.Average(), 2);

        course.Rating = newAverage;

        var courseUpdated = _mapper.Map<CourseUpdated>(course);
        await _publishEndpoint.Publish(courseUpdated);
        Console.WriteLine("Published CourseUpdated");

        var result = await _context.SaveChangesAsync();

        if (result == 0)
            return BadRequest("Could not save review or rating.");

        return Ok("Review added and rating updated.");
    }

}



