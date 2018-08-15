using AirlinesApp.DataAccess.Models.Entities;
using AirlinesApp.DataAccess.Models.SupportingModels;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AirlinesApp.Services
{
     public class TicketService : BaseService
     {
          public async Task<List<TicketModel>> GetSearchTickets(SearchModel search, string language)
          {
               IQueryable<Ticket> rawTickets = Db.Tickets.GetAll();
               List<Ticket> foundTickets = await (from t in rawTickets
                                                  where t.Category == search.FlightClass
                                                  where t.Flight.DateTime.Date == search.Date.Date
                                                  where t.Flight.Departure.Translations.Any(tr => tr.Value.ToLower() == search.From.ToLower())
                                                  where t.Flight.Destination.Translations.Any(tr => tr.Value.ToLower() == search.To.ToLower())
                                                  select t).ToListAsync();
               List<TicketModel> tickets = new List<TicketModel>();
               foreach (Ticket ticket in foundTickets)
               {
                    tickets.Add(new TicketModel
                    {
                         Id = ticket.Id,
                         From = ticket.Flight.Departure.Translations.FirstOrDefault(t => t.Language.Name == language)?.Value,
                         To = ticket.Flight.Destination.Translations.FirstOrDefault(t => t.Language.Name == language)
                            ?.Value,
                         Company = ticket.Company.Translations.FirstOrDefault(t => t.Language.Name == language)
                            ?.Value,
                         Date = ticket.Flight.DateTime,
                         Category = ticket.Category,
                         Price = ticket.Price,
                         TotalCount = ticket.Count,
                         BookedCount = ticket.Count
                    });
               }
               return tickets;
          }

          public async Task<List<TicketModel>> GetTicketsList(List<CartItemModel> ticketSet, string language)
          {
               List<int> ids = new List<int>();
               foreach (CartItemModel item in ticketSet)
               {
                    ids.Add(item.Ticket);
               }

               List<Ticket> rawTickets = await Db.Tickets.FindBy(t => ids.Contains(t.Id)).ToListAsync();
               List<TicketModel> tickets = new List<TicketModel>();
               foreach (Ticket ticket in rawTickets)
               {
                    tickets.Add(new TicketModel
                    {
                         Id = ticket.Id,
                         From = ticket.Flight.Departure.Translations.FirstOrDefault(t => t.Language.Name == language)?.Value,
                         To = ticket.Flight.Destination.Translations.FirstOrDefault(t => t.Language.Name == language)
                              ?.Value,
                         Company = ticket.Company.Translations.FirstOrDefault(t => t.Language.Name == language)
                              ?.Value,
                         Date = ticket.Flight.DateTime,
                         Category = ticket.Category,
                         Price = ticket.Price,
                         TotalCount = ticket.Count,
                         BookedCount = GetCountById(ticketSet, ticket.Id)
                    });
               }

               return tickets;
          }

          private int GetCountById(List<CartItemModel> cart, int id)
          {
               foreach (CartItemModel item in cart)
               {
                    if (item.Ticket == id)
                    {
                         return item.Count;
                    }
               }

               return 0;
          }
     }
}
