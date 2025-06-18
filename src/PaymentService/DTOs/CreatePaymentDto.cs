using System;
using System.ComponentModel.DataAnnotations;

namespace PaymentService.DTOs;

public class CreatePaymentDto
{
    [Required]
    public Guid CourseId { get; set; }
}