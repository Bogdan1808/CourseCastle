namespace Contracts;

public class CoursePublished
{
    public Guid Id { get; set; }
    public string Publisher { get; set; }
    public int Students { get; set; }
    public DateTime PostedAt { get; set; }
    public DateTime LastUpdatedAt { get; set; }
    public string Category { get; set; }
    public string CourseTitle { get; set; }
    public string Instructor { get; set; }
    public string Description { get; set; }
    public DateOnly DateCreated { get; set; }
    public string Level { get; set; }
    public TimeOnly Duration { get; set; }
    public int CoursePrice { get; set; }
    public float Rating { get; set; }
    public string ImageUrl { get; set; }
    public string VideoUrl { get; set; }
}
