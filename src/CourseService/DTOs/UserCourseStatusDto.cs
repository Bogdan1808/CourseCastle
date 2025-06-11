namespace CourseService.DTOs;

public class UserCourseStatusDto
{
    public Guid CourseId { get; set; }
    public string UserId { get; set; }
    public string Ownership { get; set; }
    public string Status { get; set; }
}