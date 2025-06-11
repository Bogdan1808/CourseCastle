using System;

namespace CourseService.DTOs
{
    public class UserCourseDto
    {
        public Guid Id { get; set; }
        public string UserId { get; set; }
        public Guid CourseId { get; set; }
        public string Ownership { get; set; }
        public string Status { get; set; }
        public CourseDto Course { get; set; }
    }
}