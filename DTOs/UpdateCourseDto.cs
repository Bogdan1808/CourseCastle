using System;

namespace CourseService.DTOs;

public class UpdateCourseDto
{
    public string CourseTitle { get; set; }
    public string Instructor { get; set; }
    public string Description { get; set; }
    public int? Level { get; set; }
    public int? CoursePrice { get; set; }
}