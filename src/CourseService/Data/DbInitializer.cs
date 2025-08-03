using CourseService.Entities;
using Microsoft.EntityFrameworkCore;

namespace CourseService.Data;

public class DbInitializer
{
    public static void InitDb(WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        SeedData(scope.ServiceProvider.GetService<CourseDbContext>());
    }

    private static void SeedData(CourseDbContext context)
    {
        context.Database.Migrate();
        if (context.Courses.Any())
        {
            Console.WriteLine("Already have data - no need to seed");
            return;
        }

        var courses = new List<Course>()
        {
            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "Bright Future",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 1776,
                Item = new Item
                {
                    CourseTitle = "Creative Writing Essentials",
                    Instructor = "Jules Carter",
                    Description = "Build your confidence and skills in just a few hours.",
                    DateCreated = new DateOnly(2024, 8, 10),
                    Category = Category.Art,
                    Level = Level.Apprentice,
                    Duration = new TimeOnly(3, 30),
                    CoursePrice = 86.98,
                    ImageUrl = "https://res.cloudinary.com/dtbhkctvp/image/upload/v1752231634/course-castle/images/qe2uezbzv7ddsztwpflw.png",
                    ImagePublicId = "course-castle/images/qe2uezbzv7ddsztwpflw",
                    VideoUrl = "https://res.cloudinary.com/dtbhkctvp/video/upload/v1752230511/course-castle/videos/kao5ek3ajx1uvuc6hnxg.mp4",
                    VideoPublicId = "course-castle/videos/c4lptbgxf5d9lmlicn56"
                }
            },

            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "SkillForge",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 656,
                Item = new Item
                {
                    CourseTitle = "Python for Data Science",
                    Instructor = "Jules Carter",
                    Description = "Build your confidence and skills in just a few hours.",
                    DateCreated = new DateOnly(2024, 10, 13),
                    Category = Category.Programming,
                    Level = Level.Apprentice,
                    Duration = new TimeOnly(2, 30),
                    CoursePrice = 58.61,
                    ImageUrl = "https://res.cloudinary.com/dtbhkctvp/image/upload/v1752231634/course-castle/images/qe2uezbzv7ddsztwpflw.png",
                    ImagePublicId = "course-castle/images/qe2uezbzv7ddsztwpflw",
                    VideoUrl = "https://res.cloudinary.com/dtbhkctvp/video/upload/v1752230511/course-castle/videos/kao5ek3ajx1uvuc6hnxg.mp4",
                    VideoPublicId = "course-castle/videos/c4lptbgxf5d9lmlicn56"
                }
            },

            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "Mindful Life",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 2090,
                Item = new Item
                {
                    CourseTitle = "Digital Painting Mastery",
                    Instructor = "Zen Parker",
                    Description = "Build your confidence and skills in just a few hours.",
                    DateCreated = new DateOnly(2024, 2, 16),
                    Category = Category.Design,
                    Level = Level.Expert,
                    Duration = new TimeOnly(0, 15),
                    CoursePrice = 95.53,
                    ImageUrl = "https://res.cloudinary.com/dtbhkctvp/image/upload/v1752231634/course-castle/images/qe2uezbzv7ddsztwpflw.png",
                    ImagePublicId = "course-castle/images/qe2uezbzv7ddsztwpflw",
                    VideoUrl = "https://res.cloudinary.com/dtbhkctvp/video/upload/v1752230511/course-castle/videos/kao5ek3ajx1uvuc6hnxg.mp4",
                    VideoPublicId = "course-castle/videos/c4lptbgxf5d9lmlicn56"
                }
            },

            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "SkillForge",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 2269,
                Item = new Item
                {
                    CourseTitle = "Guitar Chords 101",
                    Instructor = "Eli Rivers",
                    Description = "Learn by doing with hands-on activities.",
                    DateCreated = new DateOnly(2024, 4, 25),
                    Category = Category.Music,
                    Level = Level.Beginner,
                    Duration = new TimeOnly(3, 0),
                    CoursePrice = 50.63,
                    ImageUrl = "https://res.cloudinary.com/dtbhkctvp/image/upload/v1752231634/course-castle/images/qe2uezbzv7ddsztwpflw.png",
                    ImagePublicId = "course-castle/images/qe2uezbzv7ddsztwpflw",
                    VideoUrl = "https://res.cloudinary.com/dtbhkctvp/video/upload/v1752230511/course-castle/videos/kao5ek3ajx1uvuc6hnxg.mp4",
                    VideoPublicId = "course-castle/videos/c4lptbgxf5d9lmlicn56"
                }
            },

            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "SkillForge",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 4424,
                Item = new Item
                {
                    CourseTitle = "Personal Finance Simplified",
                    Instructor = "Zen Parker",
                    Description = "Discover the joy of learning at your own pace.",
                    DateCreated = new DateOnly(2024, 12, 26),
                    Category = Category.Finance,
                    Level = Level.Intermediate,
                    Duration = new TimeOnly(2, 15),
                    CoursePrice = 82.72,
                    ImageUrl = "https://res.cloudinary.com/dtbhkctvp/image/upload/v1752231634/course-castle/images/qe2uezbzv7ddsztwpflw.png",
                    ImagePublicId = "course-castle/images/qe2uezbzv7ddsztwpflw",
                    VideoUrl = "https://res.cloudinary.com/dtbhkctvp/video/upload/v1752230511/course-castle/videos/kao5ek3ajx1uvuc6hnxg.mp4",
                    VideoPublicId = "course-castle/videos/c4lptbgxf5d9lmlicn56"
                }
            },

            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "Mindful Life",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 2912,
                Item = new Item
                {
                    CourseTitle = "Yoga for Beginners",
                    Instructor = "Sage Bennett",
                    Description = "Gain essential knowledge and real-world insights.",
                    DateCreated = new DateOnly(2024, 10, 5),
                    Category = Category.Health,
                    Level = Level.Beginner,
                    Duration = new TimeOnly(1, 0),
                    CoursePrice = 36.64,
                    ImageUrl = "https://res.cloudinary.com/dtbhkctvp/image/upload/v1752231634/course-castle/images/qe2uezbzv7ddsztwpflw.png",
                    ImagePublicId = "course-castle/images/qe2uezbzv7ddsztwpflw",
                    VideoUrl = "https://res.cloudinary.com/dtbhkctvp/video/upload/v1752230511/course-castle/videos/kao5ek3ajx1uvuc6hnxg.mp4",
                    VideoPublicId = "course-castle/videos/c4lptbgxf5d9lmlicn56"
                }
            },

            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "DevNest",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 3757,
                Item = new Item
                {
                    CourseTitle = "Photography Bootcamp",
                    Instructor = "Blair West",
                    Description = "Discover the joy of learning at your own pace.",
                    DateCreated = new DateOnly(2024, 5, 7),
                    Category = Category.Photography,
                    Level = Level.Intermediate,
                    Duration = new TimeOnly(3, 30),
                    CoursePrice = 83.93,
                    ImageUrl = "https://res.cloudinary.com/dtbhkctvp/image/upload/v1752231634/course-castle/images/qe2uezbzv7ddsztwpflw.png",
                    ImagePublicId = "course-castle/images/qe2uezbzv7ddsztwpflw",
                    VideoUrl = "https://res.cloudinary.com/dtbhkctvp/video/upload/v1752230511/course-castle/videos/kao5ek3ajx1uvuc6hnxg.mp4",
                    VideoPublicId = "course-castle/videos/c4lptbgxf5d9lmlicn56"
                }
            },

            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "DevNest",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 1916,
                Item = new Item
                {
                    CourseTitle = "JavaScript Crash Course",
                    Instructor = "Jules Carter",
                    Description = "Learn by doing with hands-on activities.",
                    DateCreated = new DateOnly(2024, 6, 20),
                    Category = Category.Programming,
                    Level = Level.Expert,
                    Duration = new TimeOnly(2, 0),
                    CoursePrice = 94.08,
                    ImageUrl = "https://res.cloudinary.com/dtbhkctvp/image/upload/v1752231634/course-castle/images/qe2uezbzv7ddsztwpflw.png",
                    ImagePublicId = "course-castle/images/qe2uezbzv7ddsztwpflw",
                    VideoUrl = "https://res.cloudinary.com/dtbhkctvp/video/upload/v1752230511/course-castle/videos/kao5ek3ajx1uvuc6hnxg.mp4",
                    VideoPublicId = "course-castle/videos/c4lptbgxf5d9lmlicn56"
                }
            },

            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "SkillForge",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 4821,
                Item = new Item
                {
                    CourseTitle = "Mindfulness & Meditation",
                    Instructor = "Aria Moon",
                    Description = "Explore the tools and techniques of professionals.",
                    DateCreated = new DateOnly(2024, 12, 23),
                    Category = Category.Spirituality,
                    Level = Level.Expert,
                    Duration = new TimeOnly(2, 30),
                    CoursePrice = 85.91,
                    ImageUrl = "https://res.cloudinary.com/dtbhkctvp/image/upload/v1752231634/course-castle/images/qe2uezbzv7ddsztwpflw.png",
                    ImagePublicId = "course-castle/images/qe2uezbzv7ddsztwpflw",
                    VideoUrl = "https://res.cloudinary.com/dtbhkctvp/video/upload/v1752230511/course-castle/videos/kao5ek3ajx1uvuc6hnxg.mp4",
                    VideoPublicId = "course-castle/videos/c4lptbgxf5d9lmlicn56"
                }
            },

            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "CodeWise",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 525,
                Item = new Item
                {
                    CourseTitle = "UI/UX Fundamentals",
                    Instructor = "Kai Emerson",
                    Description = "Discover the joy of learning at your own pace.",
                    DateCreated = new DateOnly(2024, 9, 17),
                    Category = Category.Design,
                    Level = Level.Beginner,
                    Duration = new TimeOnly(2, 15),
                    CoursePrice = 95.37,
                    ImageUrl = "https://res.cloudinary.com/dtbhkctvp/image/upload/v1752231634/course-castle/images/qe2uezbzv7ddsztwpflw.png",
                    ImagePublicId = "course-castle/images/qe2uezbzv7ddsztwpflw",
                    VideoUrl = "https://res.cloudinary.com/dtbhkctvp/video/upload/v1752230511/course-castle/videos/kao5ek3ajx1uvuc6hnxg.mp4",
                    VideoPublicId = "course-castle/videos/c4lptbgxf5d9lmlicn56"
                }
            },

            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "Bright Future",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 4131,
                Item = new Item
                {
                    CourseTitle = "Public Speaking Mastery",
                    Instructor = "Sage Bennett",
                    Description = "Learn by doing with hands-on activities.",
                    DateCreated = new DateOnly(2024, 5, 19),
                    Category = Category.Business,
                    Level = Level.Expert,
                    Duration = new TimeOnly(3, 0),
                    CoursePrice = 30.16,
                    ImageUrl = "https://res.cloudinary.com/dtbhkctvp/image/upload/v1752231634/course-castle/images/qe2uezbzv7ddsztwpflw.png",
                    ImagePublicId = "course-castle/images/qe2uezbzv7ddsztwpflw",
                    VideoUrl = "https://res.cloudinary.com/dtbhkctvp/video/upload/v1752230511/course-castle/videos/kao5ek3ajx1uvuc6hnxg.mp4",
                    VideoPublicId = "course-castle/videos/c4lptbgxf5d9lmlicn56"
                }
            },

            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "Mindful Life",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 3862,
                Item = new Item
                {
                    CourseTitle = "Basic Drawing Skills",
                    Instructor = "Sage Bennett",
                    Description = "Discover the joy of learning at your own pace.",
                    DateCreated = new DateOnly(2024, 1, 15),
                    Category = Category.Art,
                    Level = Level.Expert,
                    Duration = new TimeOnly(1, 45),
                    CoursePrice = 86.53,
                    ImageUrl = "https://res.cloudinary.com/dtbhkctvp/image/upload/v1752231634/course-castle/images/qe2uezbzv7ddsztwpflw.png",
                    ImagePublicId = "course-castle/images/qe2uezbzv7ddsztwpflw",
                    VideoUrl = "https://res.cloudinary.com/dtbhkctvp/video/upload/v1752230511/course-castle/videos/kao5ek3ajx1uvuc6hnxg.mp4",
                    VideoPublicId = "course-castle/videos/c4lptbgxf5d9lmlicn56"
                }
            },

            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "SkillForge",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 1971,
                Item = new Item
                {
                    CourseTitle = "Excel for Business",
                    Instructor = "Aria Moon",
                    Description = "Gain essential knowledge and real-world insights.",
                    DateCreated = new DateOnly(2024, 6, 4),
                    Category = Category.Business,
                    Level = Level.Master,
                    Duration = new TimeOnly(3, 15),
                    CoursePrice = 94.9,
                    ImageUrl = "https://res.cloudinary.com/dtbhkctvp/image/upload/v1752231634/course-castle/images/qe2uezbzv7ddsztwpflw.png",
                    ImagePublicId = "course-castle/images/qe2uezbzv7ddsztwpflw",
                    VideoUrl = "https://res.cloudinary.com/dtbhkctvp/video/upload/v1752230511/course-castle/videos/kao5ek3ajx1uvuc6hnxg.mp4",
                    VideoPublicId = "course-castle/videos/c4lptbgxf5d9lmlicn56"
                }
            },

            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "Mindful Life",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 2515,
                Item = new Item
                {
                    CourseTitle = "Digital Marketing 101",
                    Instructor = "Riley Knox",
                    Description = "Build your confidence and skills in just a few hours.",
                    DateCreated = new DateOnly(2024, 2, 1),
                    Category = Category.Marketing,
                    Level = Level.Expert,
                    Duration = new TimeOnly(3, 0),
                    CoursePrice = 64.21,
                    ImageUrl = "https://res.cloudinary.com/dtbhkctvp/image/upload/v1752231634/course-castle/images/qe2uezbzv7ddsztwpflw.png",
                    ImagePublicId = "course-castle/images/qe2uezbzv7ddsztwpflw",
                    VideoUrl = "https://res.cloudinary.com/dtbhkctvp/video/upload/v1752230511/course-castle/videos/kao5ek3ajx1uvuc6hnxg.mp4",
                    VideoPublicId = "course-castle/videos/c4lptbgxf5d9lmlicn56"
                }
            },

            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "SkillForge",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 4626,
                Item = new Item
                {
                    CourseTitle = "Intro to Graphic Design",
                    Instructor = "Zen Parker",
                    Description = "Learn by doing with hands-on activities.",
                    DateCreated = new DateOnly(2024, 8, 13),
                    Category = Category.Design,
                    Level = Level.Intermediate,
                    Duration = new TimeOnly(0, 30),
                    CoursePrice = 84.28,
                    ImageUrl = "https://res.cloudinary.com/dtbhkctvp/image/upload/v1752231634/course-castle/images/qe2uezbzv7ddsztwpflw.png",
                    ImagePublicId = "course-castle/images/qe2uezbzv7ddsztwpflw",
                    VideoUrl = "https://res.cloudinary.com/dtbhkctvp/video/upload/v1752230511/course-castle/videos/kao5ek3ajx1uvuc6hnxg.mp4",
                    VideoPublicId = "course-castle/videos/c4lptbgxf5d9lmlicn56"
                }
            },

            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "SkillForge",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 4229,
                Item = new Item
                {
                    CourseTitle = "Nutrition and Wellness",
                    Instructor = "Zen Parker",
                    Description = "Discover the joy of learning at your own pace.",
                    DateCreated = new DateOnly(2024, 12, 13),
                    Category = Category.Health,
                    Level = Level.Intermediate,
                    Duration = new TimeOnly(0, 0),
                    CoursePrice = 98.1,
                    ImageUrl = "https://res.cloudinary.com/dtbhkctvp/image/upload/v1752231634/course-castle/images/qe2uezbzv7ddsztwpflw.png",
                    ImagePublicId = "course-castle/images/qe2uezbzv7ddsztwpflw",
                    VideoUrl = "https://res.cloudinary.com/dtbhkctvp/video/upload/v1752230511/course-castle/videos/kao5ek3ajx1uvuc6hnxg.mp4",
                    VideoPublicId = "course-castle/videos/c4lptbgxf5d9lmlicn56"
                }
            },

            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "Mindful Life",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 1773,
                Item = new Item
                {
                    CourseTitle = "iOS App Development",
                    Instructor = "Luna Hart",
                    Description = "Build your confidence and skills in just a few hours.",
                    DateCreated = new DateOnly(2024, 4, 8),
                    Category = Category.Software,
                    Level = Level.Master,
                    Duration = new TimeOnly(3, 45),
                    CoursePrice = 72.74,
                    ImageUrl = "https://res.cloudinary.com/dtbhkctvp/image/upload/v1752231634/course-castle/images/qe2uezbzv7ddsztwpflw.png",
                    ImagePublicId = "course-castle/images/qe2uezbzv7ddsztwpflw",
                    VideoUrl = "https://res.cloudinary.com/dtbhkctvp/video/upload/v1752230511/course-castle/videos/kao5ek3ajx1uvuc6hnxg.mp4",
                    VideoPublicId = "course-castle/videos/c4lptbgxf5d9lmlicn56"
                }
            },

            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "Mindful Life",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 2413,
                Item = new Item
                {
                    CourseTitle = "Android App Development",
                    Instructor = "Kai Emerson",
                    Description = "Explore the tools and techniques of professionals.",
                    DateCreated = new DateOnly(2024, 5, 21),
                    Category = Category.Software,
                    Level = Level.Expert,
                    Duration = new TimeOnly(0, 45),
                    CoursePrice = 98.64,
                    ImageUrl = "https://res.cloudinary.com/dtbhkctvp/image/upload/v1752231634/course-castle/images/qe2uezbzv7ddsztwpflw.png",
                    ImagePublicId = "course-castle/images/qe2uezbzv7ddsztwpflw",
                    VideoUrl = "https://res.cloudinary.com/dtbhkctvp/video/upload/v1752230511/course-castle/videos/kao5ek3ajx1uvuc6hnxg.mp4",
                    VideoPublicId = "course-castle/videos/c4lptbgxf5d9lmlicn56"
                }
            },

            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "Bright Future",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 1243,
                Item = new Item
                {
                    CourseTitle = "Intro to Cybersecurity",
                    Instructor = "Luna Hart",
                    Description = "Learn by doing with hands-on activities.",
                    DateCreated = new DateOnly(2024, 1, 26),
                    Category = Category.Cybersecurity,
                    Level = Level.Expert,
                    Duration = new TimeOnly(3, 30),
                    CoursePrice = 84.19,
                    ImageUrl = "https://res.cloudinary.com/dtbhkctvp/image/upload/v1752231634/course-castle/images/qe2uezbzv7ddsztwpflw.png",
                    ImagePublicId = "course-castle/images/qe2uezbzv7ddsztwpflw",
                    VideoUrl = "https://res.cloudinary.com/dtbhkctvp/video/upload/v1752230511/course-castle/videos/kao5ek3ajx1uvuc6hnxg.mp4",
                    VideoPublicId = "course-castle/videos/c4lptbgxf5d9lmlicn56"
                }
            },

            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "Mindful Life",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 2558,
                Item = new Item
                {
                    CourseTitle = "Blockchain Explained",
                    Instructor = "Kai Emerson",
                    Description = "Build your confidence and skills in just a few hours.",
                    DateCreated = new DateOnly(2024, 1, 12),
                    Category = Category.Software,
                    Level = Level.Expert,
                    Duration = new TimeOnly(1, 0),
                    CoursePrice = 66.85,
                    ImageUrl = "https://res.cloudinary.com/dtbhkctvp/image/upload/v1752231634/course-castle/images/qe2uezbzv7ddsztwpflw.png",
                    ImagePublicId = "course-castle/images/qe2uezbzv7ddsztwpflw",
                    VideoUrl = "https://res.cloudinary.com/dtbhkctvp/video/upload/v1752230511/course-castle/videos/kao5ek3ajx1uvuc6hnxg.mp4",
                    VideoPublicId = "course-castle/videos/c4lptbgxf5d9lmlicn56"
                }
            },

            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "CodeWise",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 581,
                Item = new Item
                {
                    CourseTitle = "Music Theory Basics",
                    Instructor = "Eli Rivers",
                    Description = "Learn by doing with hands-on activities.",
                    DateCreated = new DateOnly(2024, 11, 13),
                    Category = Category.Music,
                    Level = Level.Master,
                    Duration = new TimeOnly(1, 15),
                    CoursePrice = 31.74,
                    ImageUrl = "https://res.cloudinary.com/dtbhkctvp/image/upload/v1752231634/course-castle/images/qe2uezbzv7ddsztwpflw.png",
                    ImagePublicId = "course-castle/images/qe2uezbzv7ddsztwpflw",
                    VideoUrl = "https://res.cloudinary.com/dtbhkctvp/video/upload/v1752230511/course-castle/videos/kao5ek3ajx1uvuc6hnxg.mp4",
                    VideoPublicId = "course-castle/videos/c4lptbgxf5d9lmlicn56"
                }
            },

            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "CodeWise",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 2172,
                Item = new Item
                {
                    CourseTitle = "Speed Reading & Memory",
                    Instructor = "Riley Knox",
                    Description = "Learn by doing with hands-on activities.",
                    DateCreated = new DateOnly(2024, 7, 5),
                    Category = Category.Education,
                    Level = Level.Expert,
                    Duration = new TimeOnly(3, 15),
                    CoursePrice = 41.01,
                    ImageUrl = "https://res.cloudinary.com/dtbhkctvp/image/upload/v1752231634/course-castle/images/qe2uezbzv7ddsztwpflw.png",
                    ImagePublicId = "course-castle/images/qe2uezbzv7ddsztwpflw",
                    VideoUrl = "https://res.cloudinary.com/dtbhkctvp/video/upload/v1752230511/course-castle/videos/kao5ek3ajx1uvuc6hnxg.mp4",
                    VideoPublicId = "course-castle/videos/c4lptbgxf5d9lmlicn56"
                }
            },

            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "SkillForge",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 1507,
                Item = new Item
                {
                    CourseTitle = "Chess for Beginners",
                    Instructor = "Jules Carter",
                    Description = "Learn by doing with hands-on activities.",
                    DateCreated = new DateOnly(2024, 11, 8),
                    Category = Category.Gaming,
                    Level = Level.Expert,
                    Duration = new TimeOnly(3, 15),
                    CoursePrice = 92.68,
                    ImageUrl = "https://res.cloudinary.com/dtbhkctvp/image/upload/v1752231634/course-castle/images/qe2uezbzv7ddsztwpflw.png",
                    ImagePublicId = "course-castle/images/qe2uezbzv7ddsztwpflw",
                    VideoUrl = "https://res.cloudinary.com/dtbhkctvp/video/upload/v1752230511/course-castle/videos/kao5ek3ajx1uvuc6hnxg.mp4",
                    VideoPublicId = "course-castle/videos/c4lptbgxf5d9lmlicn56"
                }
            },

            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "SkillForge",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 597,
                Item = new Item
                {
                    CourseTitle = "French Language Basics",
                    Instructor = "Riley Knox",
                    Description = "Learn by doing with hands-on activities.",
                    DateCreated = new DateOnly(2024, 3, 12),
                    Category = Category.Language,
                    Level = Level.Intermediate,
                    Duration = new TimeOnly(2, 45),
                    CoursePrice = 72.96,
                    ImageUrl = "https://res.cloudinary.com/dtbhkctvp/image/upload/v1752231634/course-castle/images/qe2uezbzv7ddsztwpflw.png",
                    ImagePublicId = "course-castle/images/qe2uezbzv7ddsztwpflw",
                    VideoUrl = "https://res.cloudinary.com/dtbhkctvp/video/upload/v1752230511/course-castle/videos/kao5ek3ajx1uvuc6hnxg.mp4",
                    VideoPublicId = "course-castle/videos/c4lptbgxf5d9lmlicn56"
                }
            },

            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "DevNest",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 4709,
                Item = new Item
                {
                    CourseTitle = "Career Planning",
                    Instructor = "Sage Bennett",
                    Description = "Discover the joy of learning at your own pace.",
                    DateCreated = new DateOnly(2024, 1, 9),
                    Category = Category.Business,
                    Level = Level.Intermediate,
                    Duration = new TimeOnly(2, 15),
                    CoursePrice = 94.53,
                    ImageUrl = "https://res.cloudinary.com/dtbhkctvp/image/upload/v1752231634/course-castle/images/qe2uezbzv7ddsztwpflw.png",
                    ImagePublicId = "course-castle/images/qe2uezbzv7ddsztwpflw",
                    VideoUrl = "https://res.cloudinary.com/dtbhkctvp/video/upload/v1752230511/course-castle/videos/kao5ek3ajx1uvuc6hnxg.mp4",
                    VideoPublicId = "course-castle/videos/c4lptbgxf5d9lmlicn56"
                }
            },

            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "CodeWise",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 4507,
                Item = new Item
                {
                    CourseTitle = "Intro to Philosophy",
                    Instructor = "Luna Hart",
                    Description = "Explore the tools and techniques of professionals.",
                    DateCreated = new DateOnly(2024, 1, 9),
                    Category = Category.Science,
                    Level = Level.Master,
                    Duration = new TimeOnly(2, 30),
                    CoursePrice = 54.3,
                    ImageUrl = "https://res.cloudinary.com/dtbhkctvp/image/upload/v1752231634/course-castle/images/qe2uezbzv7ddsztwpflw.png",
                    ImagePublicId = "course-castle/images/qe2uezbzv7ddsztwpflw",
                    VideoUrl = "https://res.cloudinary.com/dtbhkctvp/video/upload/v1752230511/course-castle/videos/kao5ek3ajx1uvuc6hnxg.mp4",
                    VideoPublicId = "course-castle/videos/c4lptbgxf5d9lmlicn56"
                }
            },

            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "DevNest",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 1249,
                Item = new Item
                {
                    CourseTitle = "3D Modeling Basics",
                    Instructor = "Nova James",
                    Description = "Build your confidence and skills in just a few hours.",
                    DateCreated = new DateOnly(2024, 9, 13),
                    Category = Category.Design,
                    Level = Level.Apprentice,
                    Duration = new TimeOnly(0, 0),
                    CoursePrice = 61.49,
                    ImageUrl = "https://res.cloudinary.com/dtbhkctvp/image/upload/v1752231634/course-castle/images/qe2uezbzv7ddsztwpflw.png",
                    ImagePublicId = "course-castle/images/qe2uezbzv7ddsztwpflw",
                    VideoUrl = "https://res.cloudinary.com/dtbhkctvp/video/upload/v1752230511/course-castle/videos/kao5ek3ajx1uvuc6hnxg.mp4",
                    VideoPublicId = "course-castle/videos/c4lptbgxf5d9lmlicn56"
                }
            },

            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "Bright Future",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 3385,
                Item = new Item
                {
                    CourseTitle = "Ethical Hacking Intro",
                    Instructor = "Aria Moon",
                    Description = "Gain essential knowledge and real-world insights.",
                    DateCreated = new DateOnly(2024, 12, 5),
                    Category = Category.Cybersecurity,
                    Level = Level.Apprentice,
                    Duration = new TimeOnly(3, 30),
                    CoursePrice = 86.19,
                    ImageUrl = "https://res.cloudinary.com/dtbhkctvp/image/upload/v1752231634/course-castle/images/qe2uezbzv7ddsztwpflw.png",
                    ImagePublicId = "course-castle/images/qe2uezbzv7ddsztwpflw",
                    VideoUrl = "https://res.cloudinary.com/dtbhkctvp/video/upload/v1752230511/course-castle/videos/kao5ek3ajx1uvuc6hnxg.mp4",
                    VideoPublicId = "course-castle/videos/c4lptbgxf5d9lmlicn56"
                }
            },

            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "Mindful Life",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 4401,
                Item = new Item
                {
                    CourseTitle = "Beginner Cooking Skills",
                    Instructor = "Sage Bennett",
                    Description = "Learn by doing with hands-on activities.",
                    DateCreated = new DateOnly(2024, 2, 12),
                    Category = Category.Cooking,
                    Level = Level.Expert,
                    Duration = new TimeOnly(2, 45),
                    CoursePrice = 80.6,
                    ImageUrl = "https://res.cloudinary.com/dtbhkctvp/image/upload/v1752231634/course-castle/images/qe2uezbzv7ddsztwpflw.png",
                    ImagePublicId = "course-castle/images/qe2uezbzv7ddsztwpflw",
                    VideoUrl = "https://res.cloudinary.com/dtbhkctvp/video/upload/v1752230511/course-castle/videos/kao5ek3ajx1uvuc6hnxg.mp4",
                    VideoPublicId = "course-castle/videos/c4lptbgxf5d9lmlicn56"
                }
            },

            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "SkillForge",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 4613,
                Item = new Item
                {
                    CourseTitle = "Web Development Bootcamp",
                    Instructor = "Aria Moon",
                    Description = "Build your confidence and skills in just a few hours.",
                    DateCreated = new DateOnly(2024, 4, 16),
                    Category = Category.Programming,
                    Level = Level.Intermediate,
                    Duration = new TimeOnly(0, 45),
                    CoursePrice = 99.77,
                    ImageUrl = "https://res.cloudinary.com/dtbhkctvp/image/upload/v1752231634/course-castle/images/qe2uezbzv7ddsztwpflw.png",
                    ImagePublicId = "course-castle/images/qe2uezbzv7ddsztwpflw",
                    VideoUrl = "https://res.cloudinary.com/dtbhkctvp/video/upload/v1752230511/course-castle/videos/kao5ek3ajx1uvuc6hnxg.mp4",
                    VideoPublicId = "course-castle/videos/c4lptbgxf5d9lmlicn56"
                }
            },

            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "Fitness Gurus",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 1500,
                Item = new Item
                {
                    CourseTitle = "High-Intensity Interval Training (HIIT)",
                    Instructor = "Alex Fit",
                    Description = "Boost your metabolism and get in shape with this intense workout.",
                    DateCreated = new DateOnly(2024, 7, 1),
                    Category = Category.Fitness,
                    Level = Level.Intermediate,
                    Duration = new TimeOnly(0, 45),
                    CoursePrice = 45.00,
                    ImageUrl = "https://res.cloudinary.com/dtbhkctvp/image/upload/v1752231634/course-castle/images/qe2uezbzv7ddsztwpflw.png",
                    ImagePublicId = "course-castle/images/qe2uezbzv7ddsztwpflw",
                    VideoUrl = "https://res.cloudinary.com/dtbhkctvp/video/upload/v1752230511/course-castle/videos/kao5ek3ajx1uvuc6hnxg.mp4",
                    VideoPublicId = "course-castle/videos/c4lptbgxf5d9lmlicn56"
                }
            },

            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "Legal Eagle",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 800,
                Item = new Item
                {
                    CourseTitle = "Introduction to Contract Law",
                    Instructor = "LegalMind",
                    Description = "Understand the basics of contracts and legal agreements.",
                    DateCreated = new DateOnly(2024, 9, 5),
                    Category = Category.Legal,
                    Level = Level.Beginner,
                    Duration = new TimeOnly(2, 0),
                    CoursePrice = 120.00,
                    ImageUrl = "https://res.cloudinary.com/dtbhkctvp/image/upload/v1752231634/course-castle/images/qe2uezbzv7ddsztwpflw.png",
                    ImagePublicId = "course-castle/images/qe2uezbzv7ddsztwpflw",
                    VideoUrl = "https://res.cloudinary.com/dtbhkctvp/video/upload/v1752230511/course-castle/videos/kao5ek3ajx1uvuc6hnxg.mp4",
                    VideoPublicId = "course-castle/videos/c4lptbgxf5d9lmlicn56"
                }
            },

            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "Parenting Pros",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 1100,
                Item = new Item
                {
                    CourseTitle = "Positive Parenting Strategies",
                    Instructor = "Parental Wisdom",
                    Description = "Learn effective techniques for raising happy and resilient children.",
                    DateCreated = new DateOnly(2024, 3, 20),
                    Category = Category.Parenting,
                    Level = Level.Intermediate,
                    Duration = new TimeOnly(1, 30),
                    CoursePrice = 65.50,
                    ImageUrl = "https://res.cloudinary.com/dtbhkctvp/image/upload/v1752231634/course-castle/images/qe2uezbzv7ddsztwpflw.png",
                    ImagePublicId = "course-castle/images/qe2uezbzv7ddsztwpflw",
                    VideoUrl = "https://res.cloudinary.com/dtbhkctvp/video/upload/v1752230511/course-castle/videos/kao5ek3ajx1uvuc6hnxg.mp4",
                    VideoPublicId = "course-castle/videos/c4lptbgxf5d9lmlicn56"
                }
            },

            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "Sales Masters",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 950,
                Item = new Item
                {
                    CourseTitle = "Effective Sales Techniques",
                    Instructor = "Sales Ace",
                    Description = "Master the art of persuasion and close more deals.",
                    DateCreated = new DateOnly(2024, 6, 10),
                    Category = Category.Sales,
                    Level = Level.Expert,
                    Duration = new TimeOnly(2, 0),
                    CoursePrice = 110.00,
                    ImageUrl = "https://res.cloudinary.com/dtbhkctvp/image/upload/v1752231634/course-castle/images/qe2uezbzv7ddsztwpflw.png",
                    ImagePublicId = "course-castle/images/qe2uezbzv7ddsztwpflw",
                    VideoUrl = "https://res.cloudinary.com/dtbhkctvp/video/upload/v1752230511/course-castle/videos/kao5ek3ajx1uvuc6hnxg.mp4",
                    VideoPublicId = "course-castle/videos/c4lptbgxf5d9lmlicn56"
                }
            },

            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "Engineering Hub",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 1800,
                Item = new Item
                {
                    CourseTitle = "Introduction to Robotics",
                    Instructor = "RoboTech",
                    Description = "Learn the fundamentals of robotics and automation.",
                    DateCreated = new DateOnly(2024, 11, 1),
                    Category = Category.Engineering,
                    Level = Level.Apprentice,
                    Duration = new TimeOnly(3, 45),
                    CoursePrice = 150.00,
                    ImageUrl = "https://res.cloudinary.com/dtbhkctvp/image/upload/v1752231634/course-castle/images/qe2uezbzv7ddsztwpflw.png",
                    ImagePublicId = "course-castle/images/qe2uezbzv7ddsztwpflw",
                    VideoUrl = "https://res.cloudinary.com/dtbhkctvp/video/upload/v1752230511/course-castle/videos/kao5ek3ajx1uvuc6hnxg.mp4",
                    VideoPublicId = "course-castle/videos/c4lptbgxf5d9lmlicn56"
                }
            },
            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "Life Skills Academy",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 2800,
                Item = new Item
                {
                    CourseTitle = "Mindful Living Practices",
                    Instructor = "Serenity Guide",
                    Description = "Cultivate inner peace and well-being through daily mindful practices.",
                    DateCreated = new DateOnly(2024, 9, 28),
                    Category = Category.Lifestyle,
                    Level = Level.Beginner,
                    Duration = new TimeOnly(1, 30),
                    CoursePrice = 49.99,
                    ImageUrl = "https://res.cloudinary.com/dtbhkctvp/image/upload/v1752231634/course-castle/images/qe2uezbzv7ddsztwpflw.png",
                    ImagePublicId = "course-castle/images/qe2uezbzv7ddsztwpflw",
                    VideoUrl = "https://res.cloudinary.com/dtbhkctvp/video/upload/v1752230511/course-castle/videos/kao5ek3ajx1uvuc6hnxg.mp4",
                    VideoPublicId = "course-castle/videos/c4lptbgxf5d9lmlicn56"
                }
            }
        };
        context.AddRange(courses);

        context.SaveChanges();
    }
}