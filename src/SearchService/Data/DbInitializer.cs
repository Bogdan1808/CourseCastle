using MongoDB.Driver;
using MongoDB.Entities;
using SearchService.Models;
using SearchService.Services;

namespace SearchService.Data;

public class DbInitializer
{
    public static async Task InitDb(WebApplication app){ 
        await DB.InitAsync("SearchDb", MongoClientSettings
            .FromConnectionString(app.Configuration.GetConnectionString("MongoDbConnection")));

        await DB.Index<Item>()
            .Key(x => x.CourseTitle, KeyType.Text)
            .Key(x => x.Publisher, KeyType.Text)
            .Key(x => x.Instructor, KeyType.Text)
            .CreateAsync();

        var count = await DB.CountAsync<Item>();

        using var scope = app.Services.CreateScope();
        var httpClient = scope.ServiceProvider.GetRequiredService<CourseServiceHttpClient>();
        var items = await httpClient.GetItemsForSearchDb();

        Console.WriteLine("Items from CourseService: " + items.Count);

        if (items.Count > 0) await DB.SaveAsync(items);
    }
}
