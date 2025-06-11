
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
                Id = Guid.Parse("70d0db11-e855-4dff-bdc4-dad63bf9fcba"),
                Publisher = "bob",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 1200,
                Item = new Item
                {
                    CourseTitle = "Introduction to Machine Learning",
                    Instructor = "Dr. Alan Turing",
                    Description = "An introductory course on machine learning algorithms and principles.",
                    DateCreated = new DateOnly(2022, 12, 1),
                    Category = Category.Programming,
                    Level = Level.Intermediate,
                    Duration = new TimeOnly(4, 30),
                    CoursePrice = 22000,
                    Rating = 4.7f,
                    ImageUrl = "https://cdn.pixabay.com/photo/2018/09/12/11/05/ai-3674120_960_720.jpg"
                }
            },
            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "Creative Academy",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 900,
                Item = new Item
                {
                    CourseTitle = "Fundamentals of Graphic Design",
                    Instructor = "Jane Doe",
                    Description = "Explore the principles of design and build your creative skills.",
                    DateCreated = new DateOnly(2023, 5, 10),
                    Category = Category.Design,
                    Level = Level.Apprentice,
                    Duration = new TimeOnly(3, 45),
                    CoursePrice = 18000,
                    Rating = 4.6f,
                    ImageUrl = "https://cdn.pixabay.com/photo/2016/11/18/17/17/paint-1835091_960_720.jpg"
                }
            },
            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "Business Hub",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 500,
                Item = new Item
                {
                    CourseTitle = "Startup Business Essentials",
                    Instructor = "Elon Bright",
                    Description = "Learn how to launch and manage a successful startup.",
                    DateCreated = new DateOnly(2023, 8, 21),
                    Category = Category.Business,
                    Level = Level.Beginner,
                    Duration = new TimeOnly(5, 0),
                    CoursePrice = 25000,
                    Rating = 4.5f,
                    ImageUrl = "https://cdn.pixabay.com/photo/2015/09/05/21/51/startup-924950_960_720.jpg"
                }
            },
            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "Health Institute",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 3000,
                Item = new Item
                {
                    CourseTitle = "Yoga for Beginners",
                    Instructor = "Maya Lopez",
                    Description = "Start your yoga journey and improve your flexibility and health.",
                    DateCreated = new DateOnly(2023, 6, 1),
                    Category = Category.Fitness,
                    Level = Level.Beginner,
                    Duration = new TimeOnly(2, 15),
                    CoursePrice = 9000,
                    Rating = 4.8f,
                    ImageUrl = "https://cdn.pixabay.com/photo/2016/11/14/03/16/yoga-1822474_960_720.jpg"
                }
            },
            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "Photographers Guild",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 1500,
                Item = new Item
                {
                    CourseTitle = "Digital Photography Mastery",
                    Instructor = "Alex Winters",
                    Description = "Take stunning photos with DSLR and mirrorless cameras.",
                    DateCreated = new DateOnly(2022, 11, 11),
                    Category = Category.Photography,
                    Level = Level.Apprentice,
                    Duration = new TimeOnly(6, 0),
                    CoursePrice = 17000,
                    Rating = 4.9f,
                    ImageUrl = "https://cdn.pixabay.com/photo/2016/03/27/22/16/camera-1283975_960_720.jpg"
                }
            },
            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "CodeCamp",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 2100,
                Item = new Item
                {
                    CourseTitle = "Web Development Bootcamp",
                    Instructor = "John Dev",
                    Description = "Full-stack web development with HTML, CSS, JavaScript, and React.",
                    DateCreated = new DateOnly(2023, 2, 10),
                    Category = Category.Software,
                    Level = Level.Intermediate,
                    Duration = new TimeOnly(8, 0),
                    CoursePrice = 30000,
                    Rating = 4.4f,
                    ImageUrl = "https://cdn.pixabay.com/photo/2015/01/08/18/24/software-593310_960_720.jpg"
                }
            },
            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "Mindful Life",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 750,
                Item = new Item
                {
                    CourseTitle = "Mindfulness & Meditation",
                    Instructor = "Zen Parker",
                    Description = "Reduce stress and increase clarity with daily meditation.",
                    DateCreated = new DateOnly(2024, 1, 5),
                    Category = Category.Spirituality,
                    Level = Level.Beginner,
                    Duration = new TimeOnly(1, 30),
                    CoursePrice = 5000,
                    Rating = 4.9f,
                    ImageUrl = "https://cdn.pixabay.com/photo/2016/03/27/22/22/meditation-1287205_960_720.jpg"
                }
            },
            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "Kitchen Pro",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 3200,
                Item = new Item
                {
                    CourseTitle = "Mastering Italian Cooking",
                    Instructor = "Giuseppe Rossi",
                    Description = "Cook traditional Italian dishes like a pro.",
                    DateCreated = new DateOnly(2023, 3, 30),
                    Category = Category.Cooking,
                    Level = Level.Apprentice,
                    Duration = new TimeOnly(4, 0),
                    CoursePrice = 20000,
                    Rating = 4.6f,
                    ImageUrl = "https://cdn.pixabay.com/photo/2017/05/07/08/56/spaghetti-2290873_960_720.jpg"
                }
            },
            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "Finance School",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 650,
                Item = new Item
                {
                    CourseTitle = "Personal Finance 101",
                    Instructor = "Mary Stocks",
                    Description = "Manage your money and grow your savings smartly.",
                    DateCreated = new DateOnly(2024, 4, 10),
                    Category = Category.Finance,
                    Level = Level.Beginner,
                    Duration = new TimeOnly(3, 0),
                    CoursePrice = 14000,
                    Rating = 4.2f,
                    ImageUrl = "https://cdn.pixabay.com/photo/2017/01/30/20/27/finance-2020953_960_720.jpg"
                }
            },
            new Course
            {
                Id = Guid.NewGuid(),
                Publisher = "CodeGuard",
                PostedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Students = 1900,
                Item = new Item
                {
                    CourseTitle = "Cybersecurity Fundamentals",
                    Instructor = "Ada Lovelace",
                    Description = "Protect systems and data in today's digital world.",
                    DateCreated = new DateOnly(2023, 9, 9),
                    Category = Category.Cybersecurity,
                    Level = Level.Apprentice,
                    Duration = new TimeOnly(4, 15),
                    CoursePrice = 24000,
                    Rating = 4.8f,
                    ImageUrl = "https://cdn.pixabay.com/photo/2016/09/28/23/36/monitor-1709497_960_720.jpg"
                }
            }

        };

        context.AddRange(courses);

        context.SaveChanges();
    }
}
