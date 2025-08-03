using System;

namespace CourseService.DTOs;

public class CreateReviewDto
{
    public float Rating { get; set; }
    public string Comment { get; set; }
}