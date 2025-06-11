using System;
using System.ComponentModel.DataAnnotations;

namespace CourseService.Entities
{
    public class UserCourse
    {
        [Key]
        public Guid Id { get; set; }
        public string UserId { get; set; }
        public Guid CourseId { get; set; }
        public Ownership Ownership { get; set; }
        public Status Status { get; set; }
        public Course Course { get; set; }
    }
}