using System;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Services;

public class CourseServiceHttpClient
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _config;

    public CourseServiceHttpClient(HttpClient httpClient, IConfiguration config)
    {
        _httpClient = httpClient;
        _config = config;
    }
    
    public async Task<List<Item>> GetItemsForSearchDb()
    {
        var lastUpdated = await DB.Find<Item, string>()
            .Sort(x => x.Descending(x => x.LastUpdatedAt))
            .Project(x => x.LastUpdatedAt.ToString())
            .ExecuteFirstAsync();

        return await _httpClient.GetFromJsonAsync<List<Item>>(_config["CourseServiceUrl"]
            + "/api/courses?date=" + lastUpdated);
    }

}
