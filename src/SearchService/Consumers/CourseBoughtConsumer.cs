using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers;

public class CourseBoughtConsumer : IConsumer<CourseBought>
{
    public async Task Consume(ConsumeContext<CourseBought> context)
    {
        Console.WriteLine("---> Consuming CourseBought event");

        var course = await DB.Find<Item>().OneAsync(context.Message.CourseId);

        if (context.Message.PaymentStatus.Contains("Paid"))
        {
            if (context.Message.PaymentStatus.Contains("Paid"))
            {
                course.Ownership = "Owned";
                course.Status = "NotStarted";

                await course.SaveAsync();
            }
        }
    }
}
