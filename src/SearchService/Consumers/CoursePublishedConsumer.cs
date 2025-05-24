using AutoMapper;
using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers;

public class CoursePublishedConsumer : IConsumer<CoursePublished>
{
    private readonly IMapper _mapper;

    public CoursePublishedConsumer(IMapper mapper)
    {
        _mapper = mapper;
    }
    public async Task Consume(ConsumeContext<CoursePublished> context)
    {
        Console.WriteLine("-----> Consuming Course Published: " + context.Message.Id);

        Console.WriteLine("Category in message: " + context.Message.Category);

        var item = _mapper.Map<Item>(context.Message);

        if(item.CourseTitle == "Foo") throw new ArgumentException("Foo is not a valid course title");

        await item.SaveAsync();
    }
}
