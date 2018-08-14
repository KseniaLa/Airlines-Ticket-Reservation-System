using AirlinesApp.DataAccess;
using AirlinesApp.DataAccess.Models.Entities;
using AirlinesApp.DataAccess.Models.SupportingModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirlinesApp.Services
{
    public class OrderService
    {
        private readonly AirlinesUnitOfWork _db;

        public OrderService()
        {
            _db = new AirlinesUnitOfWork();
        }

        public async Task<List<TicketModel>> GetUserOrders(string email, string language)
        {
            User user = await _db.Users.FindBy(u => u.Email == email).FirstOrDefaultAsync();
            List<Order> orders = user.Orders.ToList();
            List<TicketModel> tickets = new List<TicketModel>();
            foreach (Order order in orders)
            {
                tickets.Add(new TicketModel
                {
                    Id = order.Id,
                    From = order.Ticket.Flight.Departure.Translations
                          .Where(t => t.Language.Name == language).FirstOrDefault().Value,
                    To = order.Ticket.Flight.Destination.Translations
                          .Where(t => t.Language.Name == language).FirstOrDefault().Value,
                    Company = order.Ticket.Company.Translations
                          .Where(t => t.Language.Name == language).FirstOrDefault().Value,
                    Date = order.Ticket.Flight.DateTime,
                    Category = order.Ticket.Category,
                    Price = order.Ticket.Price,
                    TotalCount = order.Ticket.Count,
                    BookedCount = order.Count
                });
            }
            return tickets;
        }
    }
}
