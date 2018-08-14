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
    public class TicketService
    {
        private readonly AirlinesUnitOfWork _db;

        public TicketService()
        {
            _db = new AirlinesUnitOfWork();
        }

        public async Task<List<TicketModel>> GetSearchTickets(SearchModel search, string language)
        {
            IQueryable<Ticket> rawTickets =  _db.Tickets.GetAll();
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
