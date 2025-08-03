using AutoMapper;
using Contracts;
using CourseService.DTOs;
using CourseService.Entities;

namespace CourseService.RequestHelpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Course, CourseDto>().IncludeMembers(x => x.Item);
        CreateMap<Item, CourseDto>();
        CreateMap<CreateCourseDto, Course>()
            .ForMember(d => d.Item, o => o.MapFrom(s => s));
        CreateMap<CreateCourseDto, Item>();
        CreateMap<CourseDto, CoursePublished>();
        CreateMap<Course, CourseUpdated>()
            .IncludeMembers(a => a.Item)
            .ForMember(dest => dest.Rating, opt => opt.MapFrom(src => src.Rating));
        CreateMap<Item, CourseUpdated>();
        CreateMap<UserCourse, UserCourseDto>();
    }
}
