using System;
using AirlinesApp.DataAccess.Models.Entities;
using AirlinesApp.DataAccess.Models.SupportingModels;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AirlinesApp.Exceptions;
using AirlinesApp.Services.Interfaces;

namespace AirlinesApp.Services
{
     public class TicketService : BaseService, ITicketService
     {
          public async Task<List<TicketModel>> GetSearchTickets(SearchModel search, string language)
          {
               List<Ticket> foundTickets = await Db.Tickets.GetAll().Where(t =>
                   t.Category == search.FlightClass
                   && t.Flight.DateTime.Date == search.Date.Date
                   && t.Flight.Departure.Translations.Any(tr => tr.Value.Equals(search.From, StringComparison.InvariantCultureIgnoreCase))
                   && t.Flight.Destination.Translations.Any(tr => tr.Value.Equals(search.To, StringComparison.InvariantCultureIgnoreCase))
                   && t.Count > 0).ToListAsync();
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

         public List<TicketModel> GetPageItems(List<TicketModel> itemSet, int count, int page)
         {
             int start = count * (page - 1);
             if (start > itemSet.Count - 1)
             {
                 return itemSet;
             }

             return itemSet.Skip(start).Take(count).ToList();
         }


          public async Task AddTicket(AddTicketModel ticket)
          {
               Company company = await Db.Companies
                    .FindBy(c => c.Translations.Any(tr => tr.Value.Equals(ticket.Company, StringComparison.InvariantCultureIgnoreCase)))
                    .FirstOrDefaultAsync();
               Flight testFlight = await Db.Flights
                    .FindBy(fl => fl.Id == ticket.FlightId)
                    .FirstOrDefaultAsync();

               if (company == null || testFlight == null)
               {
                    throw new LocationException("Ticket attribute not found");
               }


               Ticket testTicket = await Db.Tickets
                    .FindBy(t => t.FlightId == ticket.FlightId && t.CompanyId == company.Id && t.Category == ticket.Category)
                    .FirstOrDefaultAsync();
               if (testTicket != null)
               {
                    testTicket.Count = ticket.Count;
                    testTicket.Price = ticket.Price;
                    Db.Tickets.Update(testTicket);
                    await Db.Save();
                    return;
               }
               Ticket ticketItem = new Ticket
               {
                    FlightId = ticket.FlightId,
                    CompanyId = company.Id,
                    Category = ticket.Category,
                    Price = ticket.Price,
                    Count = ticket.Count
               };
               await Db.Tickets.Add(ticketItem);
               await Db.Save();
          }
     }
}
