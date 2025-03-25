using System;

namespace CourseService.Entities;

public class Course
{
    public Guid Id { get; set; }
    public string Publisher { get; set; }
    public int? StudentAmmount { get; set; }
    public DateTime PostedAt { get; set; } = DateTime.UtcNow;
    public DateTime LastUpdatedAt { get; set; } = DateTime.UtcNow;
    public Status Status { get; set; }
    public Ownership Ownership { get; set; } = Ownership.NotOwned;
    public Item Item { get; set; }

}
