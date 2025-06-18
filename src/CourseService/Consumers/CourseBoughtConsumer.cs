using System;
using System.Threading.Tasks;
using Contracts;
using CourseService.Data;
using CourseService.Entities;
using MassTransit;
using Microsoft.EntityFrameworkCore;

namespace CourseService.Consumers;

public class CourseBoughtConsumer : IConsumer<CourseBought>
{
    private readonly CourseDbContext _dbContext;
    
    public CourseBoughtConsumer(CourseDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task Consume(ConsumeContext<CourseBought> context)
    {
        Console.WriteLine("---> Consuming CourseBought event");
        
        if (!Guid.TryParse(context.Message.CourseId, out var courseId))
        {
            Console.WriteLine($"Invalid CourseId format: {context.Message.CourseId}");
            return;
        }
        
        var course = await _dbContext.Courses.FindAsync(courseId);
        
        if (course == null)
        {
            Console.WriteLine($"Course with ID {courseId} not found");
            return;
        }

        var existingUserCourse = await _dbContext.UserCourses
            .FirstOrDefaultAsync(uc => uc.UserId == context.Message.UserId && uc.CourseId == courseId);

        if (existingUserCourse == null)
        {
            var userCourse = new UserCourse
            {
                Id = Guid.NewGuid(),
                UserId = context.Message.UserId,
                CourseId = courseId,
                Ownership = Ownership.Owned,
                Status = Status.NotStarted
            };

            _dbContext.UserCourses.Add(userCourse);
            course.Students = (course.Students ?? 0) + 1;
            
            await _dbContext.SaveChangesAsync();
            
            Console.WriteLine($"Added course {courseId} to user {context.Message.UserId}");
        }
        else
        {
            if (existingUserCourse.Ownership != Ownership.Owned)
            {
                existingUserCourse.Ownership = Ownership.Owned;
                existingUserCourse.Status = Status.NotStarted;
                
                course.Students = (course.Students ?? 0) + 1;
                
                await _dbContext.SaveChangesAsync();
                
                Console.WriteLine($"Updated ownership for course {courseId} and user {context.Message.UserId}");
            }
            else
            {
                Console.WriteLine($"User {context.Message.UserId} already owns course {courseId}");
            }
        }
    }
}