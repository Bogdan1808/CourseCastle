using System;
using System.ComponentModel.DataAnnotations;

namespace CourseService.Entities;

public class Review
{
    [Key]
    public Guid Id { get; set; }
    public Guid CourseId { get; set; }
    public string UserId { get; set; }
    public string UserName { get; set; }
    public float Rating { get; set; }
    public string Comment { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Course Course { get; set; }
}
