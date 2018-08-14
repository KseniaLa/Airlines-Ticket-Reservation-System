using AirlinesApp.DataAccess.Models.Entities;
using AirlinesApp.DataAccess.Models.SupportingModels;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AirlinesApp.Services
{
    public class OrderService : BaseService
    {
        public async Task<List<TicketModel>> GetUserOrders(string email, string language)
        {
            User user = await Db.Users.FindBy(u => u.Email == email).FirstOrDefaultAsync();
            List<Order> orders = user.Orders.ToList();
            List<TicketModel> tickets = new List<TicketModel>();
            foreach (Order order in orders)
            {
                tickets.Add(new TicketModel
                {
                    Id = order.Id,
                    From = order.Ticket.Flight.Departure.Translations.FirstOrDefault(t => t.Language.Name == language)
                        ?.Value,
                    To = order.Ticket.Flight.Destination.Translations.FirstOrDefault(t => t.Language.Name == language)
                        ?.Value,
                    Company = order.Ticket.Company.Translations.FirstOrDefault(t => t.Language.Name == language)
                        ?.Value,
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
