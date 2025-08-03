using System.ComponentModel.DataAnnotations.Schema;
namespace CourseService.Entities;

[Table("Items")]
public class Item
{
    public Guid Id { get; set; }
    public string CourseTitle { get; set; }
    public string Instructor { get; set; }
    public string Description { get; set; }
    public DateOnly DateCreated { get; set; }
    public Category Category { get; set; }
    public Level Level { get; set; }
    public TimeOnly Duration { get; set; }
    public double CoursePrice { get; set; }
    //media
    public string ImageUrl { get; set; }
    public string ImagePublicId { get; set; }
    public string VideoUrl { get; set; }
    public string VideoPublicId { get; set; }

    //relations
    public Course Course { get; set; }
    public Guid CourseId { get; set; }
}
