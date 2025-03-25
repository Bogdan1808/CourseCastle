using System;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson.Serialization.IdGenerators;
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
            _ => query.Sort(x => x.Ascending(a => a.LastUpdatedAt))
        };

        query = searchParams.FilterBy switch
        {
            "finished" => query.Match(x => x.Status == "Finished"),
            "started" => query.Match(x => x.Status == "Started"),
            "notStarted" => query.Match(x => x.Status == "NotStarted"),
            "owned" => query.Match(x => x.Ownership == "Owned"),
            "wishlisted" => query.Match(x => x.Ownership == "Wishlisted"),
            _ => query.Sort(x => x.Ascending(a => a.LastUpdatedAt))
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
