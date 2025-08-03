using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PaymentService.Data;
using PaymentService.Entities;
using Stripe;
using MassTransit;
using Contracts;

namespace PaymentService.Controllers;

[ApiController]
[Route("api/webhooks")]
public class WebhooksController : ControllerBase
{
    private readonly PaymentDbContext _context;
    private readonly IConfiguration _configuration;
    private readonly IPublishEndpoint _publishEndpoint;
    private readonly Mailing.MailingService _mailingService;

    public WebhooksController(
        PaymentDbContext context,
        IConfiguration configuration,
        IPublishEndpoint publishEndpoint,
        Mailing.MailingService mailingService)
    {
        _context = context;
        _configuration = configuration;
        _publishEndpoint = publishEndpoint;
        _mailingService = mailingService;
    }

    [HttpPost("stripe")]
    public async Task<IActionResult> HandleStripeWebhook()
    {
        var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

        try
        {
            var stripeEvent = EventUtility.ConstructEvent(
                json,
                Request.Headers["Stripe-Signature"],
                _configuration["Stripe:WebhookSecret"]
            );

            switch (stripeEvent.Type)
            {
                case "payment_intent.succeeded":
                    await HandlePaymentSucceeded(stripeEvent);
                    break;
                case "payment_intent.payment_failed":
                    await HandlePaymentFailed(stripeEvent);
                    break;
                default:
                    Console.WriteLine($"Unhandled event type: {stripeEvent.Type}");
                    break;
            }

            return Ok();
        }
        catch (StripeException ex)
        {
            Console.WriteLine($"Stripe webhook error: {ex.Message}");
            return BadRequest();
        }
    }

    private async Task HandlePaymentSucceeded(Stripe.Event stripeEvent)
    {
        var paymentIntent = stripeEvent.Data.Object as PaymentIntent;
        if (paymentIntent == null)
        {
            Console.WriteLine("-----------------Stripe PaymentIntent is null.");
            return;
        }
    
        Console.WriteLine($"-----------------------Received payment_intent.succeeded for PaymentIntentId: {paymentIntent.Id}");
    
        var payment = await _context.Payments
            .FirstOrDefaultAsync(p => p.StripePaymentIntentId == paymentIntent.Id);
    
        if (payment == null)
        {
            Console.WriteLine($"---------------------No payment found in DB for StripePaymentIntentId: {paymentIntent.Id}");
            return;
        }
    
        if (payment.Status == PaymentStatus.Succeeded)
        {
            Console.WriteLine($"----------------------------Payment {payment.Id} already marked as succeeded.");
            return;
        }
    
        payment.Status = PaymentStatus.Succeeded;
        payment.CompletedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        Console.WriteLine($"[Webhook] Sending email to: {payment.CustomerEmail}, name: {payment.UserName}, course: {payment.CourseTitle}, completedAt: {payment.CompletedAt}");
        
        if (string.IsNullOrEmpty(payment.CustomerEmail))
        {
            Console.WriteLine($"[ERROR] CustomerEmail is null or empty for payment {payment.Id}");
            return;
        }
        if (string.IsNullOrEmpty(payment.UserName))
        {
            Console.WriteLine($"[ERROR] UserName is null or empty for payment {payment.Id}");
            return;
        }
        if (string.IsNullOrEmpty(payment.CourseTitle))
        {
            Console.WriteLine($"[ERROR] CourseTitle is null or empty for payment {payment.Id}");
            return;
        }

        try
        {
            await _mailingService.SendEmailAsync(
                payment.UserName ?? "User",
                payment.CustomerEmail,
                payment.CompletedAt ?? DateTime.UtcNow,
                payment.CourseTitle
            );
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[ERROR] Failed to send email: {ex}");
        }

        try
        {
            Console.WriteLine($"----------------------------Publishing CourseBought event for user {payment.UserId} and course {payment.CourseId}");
            var courseBoughtEvent = new CourseBought
            {
                Id = Guid.NewGuid().ToString(),
                CourseId = payment.CourseId.ToString(),
                UserId = payment.UserId,
                BuyTime = payment.CompletedAt ?? DateTime.UtcNow,
                PaymentStatus = payment.Status.ToString()
            };

            await _publishEndpoint.Publish(courseBoughtEvent);
            Console.WriteLine($"----------------------------Published CourseBought event for user {payment.UserId} and course {payment.CourseId}");


        }
        catch (Exception ex)
        {
            Console.WriteLine($"------------------------------Failed to publish CourseBought event: {ex}");
        }
    }

    private async Task HandlePaymentFailed(Stripe.Event stripeEvent)
    {
        var paymentIntent = stripeEvent.Data.Object as PaymentIntent;
        if (paymentIntent == null) return;

        var payment = await _context.Payments
            .FirstOrDefaultAsync(p => p.StripePaymentIntentId == paymentIntent.Id);

        if (payment != null)
        {
            payment.Status = PaymentStatus.Failed;
            payment.FailureReason = paymentIntent.LastPaymentError?.Message ?? "Payment failed";
            await _context.SaveChangesAsync();
        }
    }
}