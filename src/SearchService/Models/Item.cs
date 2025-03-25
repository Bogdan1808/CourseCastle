using MongoDB.Entities;

namespace SearchService.Models;

public class Item : Entity
{
    public string Publisher { get; set; }
    public int StudentAmmount { get; set; }
    public DateTime PostedAt { get; set; }
    public DateTime LastUpdatedAt { get; set; }
    public string Status { get; set; }
    public string CourseTitle { get; set; }
    public string Instructor { get; set; }
    public string Description { get; set; }
    public DateOnly DateCreated { get; set; }
    public int Level { get; set; }
    public TimeOnly Duration { get; set; }
    public int CoursePrice { get; set; }
    public string Ownership { get; set; }
    public float Rating { get; set; }
    public string ImageUrl { get; set; }
}
