using System;
using Contracts;
using CourseService.Data;
using CourseService.Entities;
using MassTransit;

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
        var course = await _dbContext.Courses.FindAsync(context.Message.CourseId);

        if (context.Message.PaymentStatus.Contains("Paid"))
        {
            course.Ownership = Ownership.Owned;
            course.Status = Status.NotStarted;

            await _dbContext.SaveChangesAsync();
        }
    }
}
