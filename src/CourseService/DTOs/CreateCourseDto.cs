#nullable enable
using System.ComponentModel.DataAnnotations;

namespace CourseService.DTOs;

public class CreateCourseDto
{
    public required string CourseTitle { get; set; }
    public required string Instructor { get; set; }
    public required string Description { get; set; }
    public required DateOnly? DateCreated { get; set; }
    public required string Category { get; set; }
    public required string Level { get; set; }
    public TimeOnly? Duration { get; set; }
    public required double CoursePrice { get; set; }

    public IFormFile? ImageFile { get; set; }
    public IFormFile? VideoFile { get; set; }
}
