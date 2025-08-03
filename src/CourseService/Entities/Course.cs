using System;

namespace CourseService.Entities;

public class Course
{
    public Guid Id { get; set; }
    public string Publisher { get; set; }
    public int? Students { get; set; }
    public DateTime PostedAt { get; set; } = DateTime.UtcNow;
    public DateTime LastUpdatedAt { get; set; } = DateTime.UtcNow;
    public Item Item { get; set; }
    public double Rating { get; set; }

    public ICollection<UserCourse> UserCourses { get; set; }
    public ICollection<Review> Reviews { get; set; }
}
