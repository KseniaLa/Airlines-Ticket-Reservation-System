using Microsoft.AspNetCore.Identity.UI.Services;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace AirlinesApp.Services
{
    public class EmailSender
    {
        public EmailSender()
        {
            
        }


        public async Task Execute()
        {
             var apiKey = "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";
             var client = new SendGridClient(apiKey);
             var msg = new SendGridMessage()
             {
                  From = new EmailAddress("ksenia.lashch@gmail.com", "Team"),
                  Subject = "Sending with SendGrid is Fun",
                  PlainTextContent = "and easy to do anywhere, even with C#",
                  HtmlContent = "<strong>and easy to do anywhere, even with C#</strong>"
             };
             msg.AddTo(new EmailAddress("ksenia.lashch@gmail.com", "Test User"));
             var response = await client.SendEmailAsync(msg);
          }
    }
}
