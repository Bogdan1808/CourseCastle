namespace Contracts;

public class CourseBought
{
    public string Id { get; set; }
    public string CourseId { get; set; }
    public string UserId { get; set; }
    public DateTime BuyTime { get; set; }
    public string PaymentStatus { get; set; }
}
