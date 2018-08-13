using System;
using System.Collections.Generic;
using System.Text;
using AirlinesTicketsReservationApp.Repositories;
using AirlinesTicketsReservationApp.Models.Models.SupportingModels;
using Models;
using System.Threading.Tasks;
using System.Linq;

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
            List<Ticket> tic =  await _db.SearchForTickets(search, language);
            List<TicketModel> tickets = new List<TicketModel>();
            foreach (Ticket ticket in tic)
            {
                tickets.Add(new TicketModel
                {
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
