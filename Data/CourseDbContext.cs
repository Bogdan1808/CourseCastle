using System;
using CourseService.Entities;
using Microsoft.EntityFrameworkCore;

namespace CourseService.Data;

public class CourseDbContext : DbContext
{
    public CourseDbContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Course> Courses { get; set; }
}
