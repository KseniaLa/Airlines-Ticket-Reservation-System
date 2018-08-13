using AirlinesTicketsReservationApp.Models.Models.SupportingModels;
using AirlinesTicketsReservationApp.Repositories;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class OrderService
    {
          private readonly UserRepository _db;
          private readonly OrderRepository _dbOrder;

          public OrderService()
          {
               _db = new UserRepository();
               _dbOrder = new OrderRepository();
          }

          public async Task<List<TicketModel>> GetUserOrders(string email, string language)
          {
               User user = await _db.GetUserByEmail(email);
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
