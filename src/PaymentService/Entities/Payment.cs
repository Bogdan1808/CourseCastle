using System.ComponentModel.DataAnnotations;

namespace PaymentService.Entities;

public class Payment
{
    [Key]
    public Guid Id { get; set; }
    public string UserId { get; set; }
    public string UserName { get; set; }
    public string CustomerEmail { get; set; }
    public Guid CourseId { get; set; }
    public string StripePaymentIntentId { get; set; }
    public double Amount { get; set; }
    public string Currency { get; set; } = "usd";
    public PaymentStatus Status { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? CompletedAt { get; set; }
    public string? FailureReason { get; set; }
    public string CourseTitle { get; set; }
    public string Instructor { get; set; }
}