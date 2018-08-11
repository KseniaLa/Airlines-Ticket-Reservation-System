using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Text;

namespace Services
{
    public class EmailService 
    {
          private const string _serverName = "smtp.gmail.com";
          private const int _port = 587;
          private const string _senderEmail = "airlinesApp.mail@gmail.com";
          private const string _senderName = "AirlinesTeam";
          private const string _senderPassword = "airlinesApp";

          public static void SendTestEmail(string receiver)
          {
               MailAddress from = new MailAddress(_senderEmail, _senderName);
               MailAddress to = new MailAddress("ksenia.lashch@gmail.com");

               MailMessage message = new MailMessage(from, to);
               message.Subject = "Test email from Airlines";
               message.Body = "You've signed up to Airlines site!";
               message.IsBodyHtml = false;

               SmtpClient smtp = new SmtpClient(_senderName, _port);
               smtp.Credentials = new NetworkCredential(_senderEmail, _senderPassword);
               smtp.EnableSsl = true;
               smtp.Send(message);
          }
     }
}
