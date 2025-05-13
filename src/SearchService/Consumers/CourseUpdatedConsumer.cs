using System;
using AutoMapper;
using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers;

public class CourseUpdatedConsumer : IConsumer<CourseUpdated>
{
    private readonly IMapper _mapper;

    public CourseUpdatedConsumer(IMapper mapper)
    {
        _mapper = mapper;
    }

    public async Task Consume(ConsumeContext<CourseUpdated> context)
    {   
        Console.WriteLine("---> Consuming course uodated: " + context.Message.Id);

        var item = _mapper.Map<Item>(context.Message);

        var result = await DB.Update<Item>()
            .Match(a => a.ID == context.Message.Id)
            .ModifyOnly(x => new
            {
                x.CourseTitle,
                x.Description,
                x.CoursePrice,
                x.Level,
                x.Instructor
            }, item)
            .ExecuteAsync();

        if (!result.IsAcknowledged)
        {
            throw new MessageException(typeof(CourseUpdated), "Problem updating course in MongoDB");
        }

    }
}
