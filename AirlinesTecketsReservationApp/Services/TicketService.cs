using System;
using System.Collections.Generic;
using System.Text;
using AirlinesTicketsReservationApp.Repositories;
using AirlinesTicketsReservationApp.Models.Models.SupportingModels;
using Models;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Services
{
     public class TicketService
     {
          private readonly TicketRepository _db;

          public TicketService()
          {
               _db = new TicketRepository();
          }

          public async Task<List<TicketModel>> GetSearchTickets(Search search, string language)
          {
               IEnumerable<Ticket> rawTickets = await _db.GetAll();
               List<Ticket> foundTickets = (from t in rawTickets
                                            where t.Category == search.FlightClass
                                            where t.Flight.DateTime.Date == search.Date.Date
                                            where t.Flight.Departure.Translations.Any(tr => tr.Value == search.From)
                                            where t.Flight.Destination.Translations.Any(tr => tr.Value == search.To)
                                            select t).ToList();
               List<TicketModel> tickets = new List<TicketModel>();
               foreach (Ticket ticket in foundTickets)
               {
                    tickets.Add(new TicketModel
                    {
                         Id = ticket.Id,
                         From = ticket.Flight.Departure.Translations.Where(t => t.Language.Name == language).FirstOrDefault().Value,
                         To = ticket.Flight.Destination.Translations
                              .Where(t => t.Language.Name == language).FirstOrDefault().Value,
                         Company = ticket.Company.Translations
                              .Where(t => t.Language.Name == language).FirstOrDefault().Value,
                         Date = ticket.Flight.DateTime,
                         Category = ticket.Category,
                         Price = ticket.Price,
                         TotalCount = ticket.Count,
                         BookedCount = ticket.Count
                    });
               }
               return tickets;
          }
     }
}
