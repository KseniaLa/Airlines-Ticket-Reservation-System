using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using AirlinesApp.Config;
using AirlinesApp.Services.Interfaces;

namespace AirlinesApp.Services
{
    public class EmailService : IEmailService, IScopedService
    {
        private readonly IConfig _config;

        public EmailService(IConfig config)
        {
            _config = config;
        }

        public async Task SendEmail(string email, string subject, string message)
        {
            using (var client = new SmtpClient())
            {
                var credential = new NetworkCredential
                {
                    UserName = _config.SenderEmail,
                    Password = _config.SenderPassword
                };

                client.Credentials = credential;
                client.Host = _config.SmtpServer;
                client.Port = _config.SmtpPort;
                client.EnableSsl = true;

                using (var emailMessage = new MailMessage())
                {
                    emailMessage.To.Add(new MailAddress(email));
                    emailMessage.From = new MailAddress(_config.SenderEmail);
                    emailMessage.Subject = subject;
                    emailMessage.Body = message;
                    emailMessage.IsBodyHtml = true;
                    client.Send(emailMessage);
                }
            }
            await Task.CompletedTask;
        }
    }
}
