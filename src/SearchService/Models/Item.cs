using MongoDB.Entities;

namespace SearchService.Models;

public class Item : Entity
{
    public required string  Publisher { get; set; }
    public int Students { get; set; }
    public DateTime PostedAt { get; set; }
    public DateTime LastUpdatedAt { get; set; }
    public required string Status { get; set; }
    public required string CourseTitle { get; set; }
    public required string Instructor { get; set; }
    public required string Description { get; set; }
    public required string Category { get; set; }
    public DateOnly DateCreated { get; set; }
    public string Level { get; set; }
    public TimeOnly Duration { get; set; }
    public int CoursePrice { get; set; }
    public required string Ownership { get; set; }
    public float Rating { get; set; }
    public required string ImageUrl { get; set; }
}
