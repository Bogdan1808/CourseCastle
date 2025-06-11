using Microsoft.AspNetCore.Mvc;
using MongoDB.Entities;
using SearchService.Models;
using SearchService.RequestHelpers;
using MongoDB.Bson;
using MongoDB.Driver;

namespace SearchService.Controllers;

[ApiController]
[Route("api/search")]
public class SearchController : ControllerBase
{

    [HttpGet]
    public async Task<ActionResult<List<Item>>>SearchItems([FromQuery]SearchParams searchParams)
    {
        var query = DB.PagedSearch<Item, Item>();
        
        if (!string.IsNullOrEmpty(searchParams.SearchTerm))
        {
            var regex = new BsonRegularExpression(searchParams.SearchTerm, "i");
            var regexFilter = Builders<Item>.Filter.Regex(x => x.CourseTitle, regex);

            query.Match(regexFilter);
        }

        var order = searchParams.OrderBy?.Trim().ToLower();

        query = order switch
        {
            "coursetitle" => query.Sort(x => x.Ascending(a => a.CourseTitle)),
            "new" => query.Sort(x => x.Descending(a => a.DateCreated)),
            "durationasc" => query.Sort(x => x.Ascending(a => a.Duration)),
            "durationdesc" => query.Sort(x => x.Descending(a => a.Duration)),
            _ => query.Sort(x => x.Ascending(a => a.CourseTitle))
        };

        var filter = searchParams.FilterBy?.ToLower();
        
        query = filter switch
        {
            "programming" => query.Match(x => x.Category == "Programming"),
            "design" => query.Match(x => x.Category == "Design"),
            "marketing" => query.Match(x => x.Category == "Marketing"),
            "business" => query.Match(x => x.Category == "Business"),
            "finance" => query.Match(x => x.Category == "Finance"),
            "music" => query.Match(x => x.Category == "Music"),
            "photography" => query.Match(x => x.Category == "Photography"),
            "health" => query.Match(x => x.Category == "Health"),
            "language" => query.Match(x => x.Category == "Language"),
            "science" => query.Match(x => x.Category == "Science"),
            "education" => query.Match(x => x.Category == "Education"),
            "software" => query.Match(x => x.Category == "Software"),
            "lifestyle" => query.Match(x => x.Category == "Lifestyle"),
            "fitness" => query.Match(x => x.Category == "Fitness"),
            "art" => query.Match(x => x.Category == "Art"),
            "cybersecurity" => query.Match(x => x.Category == "Cybersecurity"),
            "engineering" => query.Match(x => x.Category == "Engineering"),
            "sales" => query.Match(x => x.Category == "Sales"),
            "parenting" => query.Match(x => x.Category == "Parenting"),
            "spirituality" => query.Match(x => x.Category == "Spirituality"),
            "cooking" => query.Match(x => x.Category == "Cooking"),
            "gaming" => query.Match(x => x.Category == "Gaming"),
            "legal" => query.Match(x => x.Category == "Legal"),
            _ => query
        };
        
        var filteredLevel = searchParams.LevelFilter?.ToLower();

        query = filteredLevel switch
        {
            "beginner" => query.Match(x => x.Level == "Beginner"),
            "apprentice" => query.Match(x => x.Level == "Apprentice"),
            "intermediate" => query.Match(x => x.Level == "Intermediate"),
            "master" => query.Match(x => x.Level == "Master"),
            "expert" => query.Match(x => x.Level == "Expert"),
            _ => query
        };

        if (!string.IsNullOrEmpty(searchParams.Publisher))
        {
            query.Match(x => x.Publisher == searchParams.Publisher);
        }

        query.PageNumber(searchParams.PageNumber);
        query.PageSize(searchParams.PageSize);

        var result = await query.ExecuteAsync();

        return Ok(new
        {
            result = result.Results,
            pageCount = result.PageCount,
            totalCount = result.TotalCount
        });
    }
}
