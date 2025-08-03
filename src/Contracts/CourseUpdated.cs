namespace Contracts;

public class CourseUpdated
{
    public string Id { get; set; }
    public string CourseTitle { get; set; }
    public string Instructor { get; set; }
    public string Description { get; set; }
    public string Level { get; set; }
    public double CoursePrice { get; set; }
    public double Rating { get; set; }
    public int Students { get; set; }
    public string ImageUrl { get; set; } 
    public string VideoUrl { get; set; } 
}
