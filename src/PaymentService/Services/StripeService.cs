using Stripe;

namespace PaymentService.Services;

public class StripeService
{
    private readonly string _publishableKey;

    public StripeService(IConfiguration configuration)
    {
        StripeConfiguration.ApiKey = configuration["Stripe:SecretKey"];
        _publishableKey = configuration["Stripe:PublishableKey"];
    }

    public string GetPublishableKey() => _publishableKey;

    public async Task<PaymentIntent> CreatePaymentIntentAsync(int amount, string userId, string courseTitle, string instructor, string customerEmail, Guid courseId)
    {
        var options = new PaymentIntentCreateOptions
        {
            Amount = amount,
            Currency = "usd",
            Metadata = new Dictionary<string, string>
            {
                ["courseId"] = courseId.ToString(),
                ["userId"] = userId,
                ["courseTitle"] = courseTitle,
                ["instructor"] = instructor,
                ["customerEmail"] = customerEmail
            },
            AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
            {
                Enabled = true
            },
            Description = $"Course: {courseTitle} by {instructor}"
        };

        var service = new PaymentIntentService();
        return await service.CreateAsync(options);
    }
}