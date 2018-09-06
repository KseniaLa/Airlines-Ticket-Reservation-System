using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AirlinesApp.Config;
using AirlinesApp.DataAccess;
using AirlinesApp.DataAccess.Models.Entities;
using AirlinesApp.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AirlinesApp.Services
{
    public class NotificationsService : BackgroundService
    {
        protected IUnitOfWork Db;
        private readonly IEmailService _emailService;

        public NotificationsService(IConfig config, IUnitOfWork unitOfWork)
        {
            Db = unitOfWork;
            _emailService = new EmailService(config);
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            //while (!stoppingToken.IsCancellationRequested)
            //{
                await SendNotifications();
            // }
        }

        private async Task SendNotifications()
        {
            try
            {
                List<Order> orders = await Db.Orders.GetAll().ToListAsync();
                foreach (Order order in orders)
                {
                    await _emailService.SendEmail(order.User.Email, "background service",
                        order.Ticket.Flight.Departure.Default);
                }
            }
            catch (Exception e)
            {
                int i = 5;
            }   
        }

        public override async Task StopAsync(CancellationToken stoppingToken)
        {
            // Run your clean-up actions
        }
    }
}
