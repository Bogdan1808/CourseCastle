using System;

namespace PaymentService.DTOs;

public class PaymentResponseDto
{
    public Guid PaymentId { get; set; }
    public string ClientSecret { get; set; }
    public int Amount { get; set; }
    public string CourseTitle { get; set; }
    public string Status { get; set; }
    public string PublishableKey { get; set; }
}
