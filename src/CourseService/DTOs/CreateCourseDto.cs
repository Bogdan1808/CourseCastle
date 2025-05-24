using System.ComponentModel.DataAnnotations;

namespace CourseService.DTOs;

public class CreateCourseDto
{
    [Required]
    public string CourseTitle { get; set; }

    [Required]
    public string Instructor { get; set; }

    [Required]
    public string Description { get; set; }

    [Required]
    public DateOnly? DateCreated { get; set; }

    [Required]
    public string Category { get; set; }

    [Required]
    public int? Level { get; set; }

    [Required]
    public TimeOnly? Duration { get; set; }

    [Required]
    public int CoursePrice { get; set; }

    [Required]
    public string ImageUrl { get; set; }
}
