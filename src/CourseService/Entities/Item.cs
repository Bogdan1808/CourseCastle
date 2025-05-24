using System;
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
    public int Level { get; set; }
    public TimeOnly Duration { get; set; }
    public int CoursePrice { get; set; }
    public float Rating { get; set; }
    public string ImageUrl { get; set; }

    //relations
    public Course Course { get; set; }
    public Guid CourseId { get; set; }
}
