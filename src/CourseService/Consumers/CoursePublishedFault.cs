using System;
using Contracts;
using MassTransit;

namespace CourseService.Consumers;

public class CoursePublishedFaultConsumer : IConsumer<Fault<CoursePublished>>
{
    public async Task Consume(ConsumeContext<Fault<CoursePublished>> context)
    {
        Console.WriteLine("--> Consuming faulty creation");

        var exception = context.Message.Exceptions.First();

        if(exception.ExceptionType == "System.ArgumentException")
        {
            context.Message.Message.CourseTitle = "FooBar";
            await context.Publish(context.Message.Message);
        } 
        else
        {
            Console.WriteLine("Not an argument exception - update error dashboard somewhere");
        }
    }
}
