using System;
using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers;

public class CourseDeletedConsumer : IConsumer<CourseDeleted>
{
    public async Task Consume(ConsumeContext<CourseDeleted> context)
    {
        Console.WriteLine("---> Consuming CourseDeleted: " + context.Message.Id);

        var result = await DB.DeleteAsync<Item>(context.Message.Id);

        if(!result.IsAcknowledged)
        {
            throw new MessageException(typeof(CourseDeleted),  "Failed to delete course from MongoDB");
        }
    }
}
