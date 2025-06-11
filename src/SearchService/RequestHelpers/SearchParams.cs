using System;

namespace SearchService.RequestHelpers;

public class SearchParams
{
    public string? SearchTerm { get; set; }
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 4;
    public string? Publisher { get; set; }
    public string? OrderBy { get; set; }
    public string? FilterBy { get; set; }
    public string? LevelFilter { get; set; }
    public string? Category { get; set; }
}
