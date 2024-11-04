
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
                Id = Guid.Parse("afbee524-5972-4075-8800-7d1f9d7b0a0c"),
                Status = Status.Started,
                Publisher = "TechMaster Academy",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Item = new Item
                {
                    CourseTitle = "Mastering Python",
                    Instructor = "John Doe",
                    Description = "Learn advanced Python programming for real-world applications.",
                    DateCreated = new DateOnly(2023, 1, 15),
                    Level = 3,
                    Duration = new TimeOnly(3, 30),
                    CoursePrice = 20000,
                    Rating = 4.7f,
                    ImageUrl = "https://cdn.pixabay.com/photo/2016/05/06/16/32/computer-code.jpg"
                }
            },
            new Course
            {
                Id = Guid.Parse("bda34276-4a95-4e23-a1c4-1a7ab7b27d14"),
                Status = Status.NotStarted,
                Publisher = "CodeCamp",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Item = new Item
                {
                    CourseTitle = "JavaScript for Beginners",
                    Instructor = "Jane Smith",
                    Description = "Introduction to JavaScript programming for web development.",
                    DateCreated = new DateOnly(2023, 6, 1),
                    Level = 1,
                    Duration = new TimeOnly(2, 0),
                    CoursePrice = 15000,
                    Rating = 4.5f,
                    ImageUrl = "https://cdn.pixabay.com/photo/2015/09/05/22/46/javascript-924226_960_720.png"
                }
            },
            new Course
            {
                Id = Guid.Parse("6dbe4f57-3cb1-4f6e-8168-91b6b833506b"),
                Status = Status.Finished,
                Publisher = "DataScience Academy",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Item = new Item
                {
                    CourseTitle = "Data Science with Python",
                    Instructor = "Dr. Mike Johnson",
                    Description = "Comprehensive course on data science techniques using Python.",
                    DateCreated = new DateOnly(2022, 11, 10),
                    Level = 4,
                    Duration = new TimeOnly(5, 0),
                    CoursePrice = 30000,
                    Rating = 4.8f,
                    ImageUrl = "https://cdn.pixabay.com/photo/2018/05/18/15/46/artificial-intelligence-3411373_960_720.jpg"
                }
            },
            new Course
            {
                Id = Guid.Parse("34a0be6c-68a5-4d93-b5f5-4df8c6bfa2b4"),
                Status = Status.Started,
                Publisher = "DesignHub",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Item = new Item
                {
                    CourseTitle = "UI/UX Design Basics",
                    Instructor = "Laura White",
                    Description = "A beginner's guide to UI/UX design principles and practices.",
                    DateCreated = new DateOnly(2023, 5, 20),
                    Level = 1,
                    Duration = new TimeOnly(1, 30),
                    CoursePrice = 12000,
                    Rating = 4.4f,
                    ImageUrl = "https://cdn.pixabay.com/photo/2017/07/31/22/11/laptop-2557586_960_720.jpg"
                }
            },
            new Course
            {
                Id = Guid.Parse("ca1f2434-62f6-4b3c-964b-74c4b65eb5d2"),
                Status = Status.Finished,
                Publisher = "MusicPro",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Item = new Item
                {
                    CourseTitle = "Guitar for Beginners",
                    Instructor = "Chris Martin",
                    Description = "A step-by-step guide to learning the basics of guitar playing.",
                    DateCreated = new DateOnly(2023, 7, 15),
                    Level = 1,
                    Duration = new TimeOnly(1, 45),
                    CoursePrice = 5000,
                    Rating = 4.6f,
                    ImageUrl = "https://cdn.pixabay.com/photo/2017/01/19/21/44/guitar-1990678_960_720.jpg"
                }
            },
            new Course
            {
                Id = Guid.Parse("d9e9ae5c-7d3b-4c80-a1b8-fd67165fcfad"),
                Status = Status.Started,
                Publisher = "Fitness Academy",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Item = new Item
                {
                    CourseTitle = "Yoga for Beginners",
                    Instructor = "Sarah Lee",
                    Description = "An introduction to yoga practices and mindfulness.",
                    DateCreated = new DateOnly(2023, 8, 30),
                    Level = 1,
                    Duration = new TimeOnly(2, 15),
                    CoursePrice = 18000,
                    Rating = 4.9f,
                    ImageUrl = "https://cdn.pixabay.com/photo/2017/02/05/13/26/yoga-2040989_960_720.jpg"
                }
            },
            new Course
            {
                Id = Guid.Parse("1f8b2b64-4c0d-4604-8a4a-6ab04a0b3e7b"),
                Status = Status.Finished,
                Publisher = "Culinary Institute",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Item = new Item
                {
                    CourseTitle = "Mastering the Art of French Cooking",
                    Instructor = "Chef Pierre",
                    Description = "Learn classic French cooking techniques and recipes.",
                    DateCreated = new DateOnly(2023, 3, 10),
                    Level = 4,
                    Duration = new TimeOnly(6, 0),
                    CoursePrice = 25000,
                    Rating = 4.9f,
                    ImageUrl = "https://cdn.pixabay.com/photo/2015/05/16/14/11/french-cuisine.jpg"
                }
            },
            new Course
            {
                Id = Guid.Parse("2be9b68b-29de-46b5-bd65-0ef7b37b3722"),
                Status = Status.NotStarted,
                Publisher = "WebDev Academy",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Item = new Item
                {
                    CourseTitle = "Advanced CSS",
                    Instructor = "Michael Brown",
                    Description = "Deep dive into CSS and responsive web design.",
                    DateCreated = new DateOnly(2023, 5, 30),
                    Level = 2,
                    Duration = new TimeOnly(2, 45),
                    CoursePrice = 10000,
                    Rating = 4.5f,
                    ImageUrl = "https://cdn.pixabay.com/photo/2016/11/29/07/05/css-1867747_960_720.jpg"
                }
            },
            new Course
            {
                Id = Guid.Parse("70d0db11-e855-4dff-bdc4-dad63bf9fcba"),
                Status = Status.Finished,
                Publisher = "AI Learning",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Item = new Item
                {
                    CourseTitle = "Introduction to Machine Learning",
                    Instructor = "Dr. Alan Turing",
                    Description = "An introductory course on machine learning algorithms and principles.",
                    DateCreated = new DateOnly(2022, 12, 1),
                    Level = 3,
                    Duration = new TimeOnly(4, 30),
                    CoursePrice = 22000,
                    Rating = 4.7f,
                    ImageUrl = "https://cdn.pixabay.com/photo/2018/09/12/11/05/ai-3674120_960_720.jpg"
                }
            }
        };

        context.AddRange(courses);

        context.SaveChanges();
    }
}
