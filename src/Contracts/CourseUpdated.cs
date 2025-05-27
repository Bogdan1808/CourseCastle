namespace Contracts;

public class CourseUpdated
{
    public string Id { get; set; }
    public string CourseTitle { get; set; }
    public string Instructor { get; set; }
    public string Description { get; set; }
    public int Level { get; set; }
    public int CoursePrice { get; set; }
    public int Rating { get; set; }
    public int Students { get; set; }
}
