using System;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using AirlinesApp.DataAccess;
using AirlinesApp.Services.Interfaces;
using Microsoft.Extensions.Configuration;

namespace AirlinesApp.Services
{
     public class EmailService
     {
          private static readonly IConfiguration Configuration = ConfigBuilder.GetConfigRoot(Directory.GetCurrentDirectory());
          private static readonly string ServerName = Configuration["SmtpServer"];
          private static readonly int ServerPort = int.Parse(Configuration["SmtpPort"]);
          private static readonly string SenderEmail = Configuration["SenderEmail"];
          private static readonly string SenderName = Configuration["SenderName"];
          private static readonly string SenderPassword = Configuration["SenderPassword"];

          public static async Task SendTestEmail(string receiver)
          {
               try
               {
                    var smtpClient = new SmtpClient
                    {
                         Host = ServerName,
                         Port = ServerPort,
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
