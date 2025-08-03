using System;
using MassTransit.Context;

namespace CourseService.DTOs;

public class ReviewDto
{
    public Guid Id { get; set; }
    public string UserId { get; set; }
    public Guid CourseId { get; set; }
    public string UserName { get; set; }
    public float Rating { get; set; }
    public string Comment { get; set; }
    public DateTime CreatedAt { get; set; }
}
