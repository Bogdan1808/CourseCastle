using SendGrid;
using SendGrid.Helpers.Mail;

namespace Mailing
{
    public class MailingService
    {
        private readonly string _apiKey;

        public MailingService(string apiKey)
        {
            _apiKey = apiKey;
        }

        public async Task SendEmailAsync(string username, string userEmail, DateTime completedAt, string courseTitle)
        {
            var eetNow = completedAt.AddHours(3);
            var client = new SendGridClient(_apiKey);
            var from = new EmailAddress("coursecastle2025@gmail.com", "CourseCastle");
            const string subject = "Course Purchased Successfully!";
            var to = new EmailAddress(userEmail, username);
            var plainTextContent = $"Hello {username},\n\nYou have successfully purchased a new course!";
            var htmlContent = $"<body style=\"font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;\">\n    <div style=\"max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\">\n        <div style=\"text-align: center; padding: 20px 0; border-bottom: 1px solid #e0e0e0;\">\n            <h1 style=\"margin: 0; font-size: 24px; color: #333333;\">Course bought successfully!</h1>\n        </div>\n        <div style=\"padding: 20px 0; text-align: center;\">\n            <p style=\"font-size: 16px; color: #555555; line-height: 1.5;\">You have bought the course: <span style=\"font-weight: bold; color: #333333;\">{courseTitle}</span></p>\n            <p style=\"font-size: 16px; color: #555555; line-height: 1.5;\">on <span style=\"font-weight: bold; color: #333333;\">{eetNow:dd.MM.yyyy, 'at' HH:mm}</span>. </p>\n <p> May your learning jurney be a fruitful one!</p>\n      </div>\n        <div style=\"text-align: center; padding: 10px 0; border-top: 1px solid #e0e0e0; font-size: 14px; color: #999999;\">\n            <p>&copy; 2025 CourseCastle. All rights reserved.</p>\n        </div>\n    </div>\n</body>"; ;    

            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);

            Console.WriteLine($"[MailingService] SendGrid response status: {response.StatusCode}");
            var responseBody = await response.Body.ReadAsStringAsync();
            Console.WriteLine($"[MailingService] SendGrid response body: {responseBody}");
        }
    }
}