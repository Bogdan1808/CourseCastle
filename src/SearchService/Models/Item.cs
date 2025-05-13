using MongoDB.Entities;

namespace SearchService.Models;

public class Item : Entity
{
    public required string  Publisher { get; set; }
    public int StudentAmmount { get; set; }
    public DateTime PostedAt { get; set; }
    public DateTime LastUpdatedAt { get; set; }
    public required string Status { get; set; }
    public required string CourseTitle { get; set; }
    public required string Instructor { get; set; }
    public required string Description { get; set; }
    public DateOnly DateCreated { get; set; }
    public int Level { get; set; }
    public TimeOnly Duration { get; set; }
    public int CoursePrice { get; set; }
    public required string Ownership { get; set; }
    public float Rating { get; set; }
    public required string ImageUrl { get; set; }
}
