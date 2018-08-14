using System;
using System.Net;
using System.Net.Mail;

namespace AirlinesApp.Services
{
    public class EmailService
    {
        private const string ServerName = "smtp.gmail.com";
        private const int Port = 465;
        private const string SenderEmail = "airlinesApp.mail@gmail.com";
        private const string SenderName = "AirlinesTeam";
        private const string SenderPassword = "airlinesApp";

        public static void SendTestEmail(string receiver)
        {
            MailAddress from = new MailAddress(SenderEmail, SenderName);
            MailAddress to = new MailAddress("ksenia.lashch@gmail.com");

            MailMessage message = new MailMessage(from, to)
            {
                Subject = "Test message from Airlines",
                Body = "You've signed up to Airlines site!",
                IsBodyHtml = false
            };

            SmtpClient smtp = new SmtpClient(ServerName, Port)
            {
                Credentials = new NetworkCredential(SenderEmail, SenderPassword),
                EnableSsl = true
            };
            try
            {
                smtp.Send(message);
            }
            catch (Exception)
            {
                // ignored
            }
        }
    }
}
