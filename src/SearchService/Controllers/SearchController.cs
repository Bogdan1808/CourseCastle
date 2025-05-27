using Microsoft.AspNetCore.Mvc;
using MongoDB.Entities;
using SearchService.Models;
using SearchService.RequestHelpers;

namespace SearchService.Controllers;

[ApiController]
[Route("api/search")]
public class SearchController : ControllerBase
{

    [HttpGet]
    public async Task<ActionResult<List<Item>>>SearchItems([FromQuery]SearchParams searchParams)
    {
        var query = DB.PagedSearch<Item, Item>();

        query.Sort(x => x.Ascending(a => a.CourseTitle));
        
        if(!string.IsNullOrEmpty(searchParams.SearchTerm))
        {
            query.Match(Search.Full, searchParams.SearchTerm).SortByTextScore();
        }

        query = searchParams.OrderBy switch
        {
            "courseTitle" => query.Sort(x => x.Ascending(a => a.CourseTitle)),
            "new" => query.Sort(x => x.Descending(a => a.DateCreated)),
            "durationAsc" => query.Sort(x => x.Ascending(a => a.Duration)),
            "durationDesc" => query.Sort(x => x.Descending(a => a.Duration)),
            _ => query.Sort(x => x.Ascending(a => a.LastUpdatedAt))
        };

        var filter = searchParams.FilterBy?.ToLower();
        
        query = filter switch
        {
            "finished" => query.Match(x => x.Status == "Finished"),
            "started" => query.Match(x => x.Status == "Started"),
            "notstarted" => query.Match(x => x.Status == "NotStarted"),
            "owned" => query.Match(x => x.Ownership == "Owned"),
            "wishlisted" => query.Match(x => x.Ownership == "Wishlisted"),
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

        if(!string.IsNullOrEmpty(searchParams.Publisher))
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
