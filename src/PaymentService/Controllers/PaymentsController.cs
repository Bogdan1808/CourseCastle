using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PaymentService.Data;
using PaymentService.DTOs;
using PaymentService.Entities;
using PaymentService.Services;
using System.Security.Claims;
using System.Text.Json;

namespace PaymentService.Controllers;

[ApiController]
[Route("api/payment")]
public class PaymentsController : ControllerBase
{
    private readonly PaymentDbContext _context;
    private readonly StripeService _stripeService;
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _configuration;

    public PaymentsController(
        PaymentDbContext context,
        StripeService stripeService,
        IHttpClientFactory httpClientFactory,
        IConfiguration configuration)
    {
        _context = context;
        _stripeService = stripeService;
        _httpClientFactory = httpClientFactory;
        _configuration = configuration;
    }

    [Authorize]
    [HttpPost("create-payment-intent")]
    public async Task<ActionResult<PaymentResponseDto>> CreatePaymentIntent(CreatePaymentDto dto)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? User.Identity.Name;
        var userEmail = User.FindFirst(ClaimTypes.Email)?.Value ?? User.FindFirst("email")?.Value;
        var userName = User.FindFirst("name")?.Value ?? User.FindFirst(ClaimTypes.Name)?.Value ?? User.Identity.Name;

        var course = await GetCourseFromCourseService(dto.CourseId);
        if (course == null)
            return BadRequest(new { message = "Course not found" });

        var existingPayment = await _context.Payments
            .FirstOrDefaultAsync(p => p.UserId == userId && p.CourseId == dto.CourseId && p.Status == PaymentStatus.Succeeded);
        if (existingPayment != null)
            return BadRequest(new { message = "You already own this course" });
        
        var ammountInCents = (int)(course.CoursePrice * 100);

        var paymentIntent = await _stripeService.CreatePaymentIntentAsync(
            ammountInCents,
            userId,
            course.CourseTitle,
            course.Instructor,
            userEmail ?? "",
            course.Id
        );

        var payment = new Payment
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            CustomerEmail = userEmail,
            UserName = userName,
            CourseId = course.Id,
            StripePaymentIntentId = paymentIntent.Id,
            Amount = course.CoursePrice,
            Currency = "usd",
            Status = PaymentStatus.Pending,
            CourseTitle = course.CourseTitle,
            Instructor = course.Instructor,
        };

        _context.Payments.Add(payment);
        await _context.SaveChangesAsync();

        return Ok(new PaymentResponseDto
        {
            PaymentId = payment.Id,
            ClientSecret = paymentIntent.ClientSecret,
            Amount = course.CoursePrice,
            CourseTitle = course.CourseTitle,
            Status = payment.Status.ToString(),
            PublishableKey = _stripeService.GetPublishableKey()
        });
    }

    private async Task<CourseDto?> GetCourseFromCourseService(Guid courseId)
    {
        var httpClient = _httpClientFactory.CreateClient();
        var courseServiceUrl = _configuration["CourseServiceUrl"];
        var response = await httpClient.GetAsync($"{courseServiceUrl}/api/courses/{courseId}");
        if (!response.IsSuccessStatusCode)
            return null;

        var json = await response.Content.ReadAsStringAsync();
        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
        return JsonSerializer.Deserialize<CourseDto>(json, options);
    }
}