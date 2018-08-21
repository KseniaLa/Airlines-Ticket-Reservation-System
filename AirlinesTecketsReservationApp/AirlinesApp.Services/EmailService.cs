using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using AirlinesApp.Services.Interfaces;

namespace AirlinesApp.Services
{
    public class EmailService
    {
        private const string ServerName = "smtp.gmail.com";
        private const int Port = 587;
        private const string SenderEmail = "airlinesApp.mail@gmail.com";
        private const string SenderName = "AirlinesTeam";
        private const string SenderPassword = "airlinesApp";

        public static async Task SendTestEmail(string receiver)
        {
            try
            {
                var smtpClient = new SmtpClient
                {
                    Host = "smtp.gmail.com", // set your SMTP server name here
                    Port = 587, // Port 
                    EnableSsl = true,
                    Credentials = new NetworkCredential(SenderEmail, SenderPassword)
                };

                using (var message = new MailMessage(SenderEmail, "ksenia.lashch@gmail.com")
                {
                    Subject = "Subject",
                    Body = "Body"
                })
                {
                    await smtpClient.SendMailAsync(message);
                }
            }
            catch (Exception e)
            {
                return;
            }
        }
    }
}
