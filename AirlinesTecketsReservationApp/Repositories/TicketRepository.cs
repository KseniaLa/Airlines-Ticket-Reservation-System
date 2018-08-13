using AirlinesTicketsReservationApp.Models;
using AirlinesTicketsReservationApp.Models.Models.SupportingModels;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace AirlinesTicketsReservationApp.Repositories
{
    public class TicketRepository : IRepository<Ticket>
    {
        private AirlinesContext db;

        public TicketRepository()
        {
            db = new AirlinesContext();
        }

        public void Add(Ticket item)
        {
            db.Tickets.AddAsync(item);
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public Task<Ticket> GetItem(int id)
        {
            return db.Tickets.FindAsync(id);
        }

        public Task<List<Ticket>> SearchForTickets(Search search, string lang)
        {
            return db.Tickets.Where(t => t.Category == search.FlightClass)
                .Where(t => t.Flight.DateTime.Date == search.Date.Date).ToListAsync();
        }

        public void Save()
        {
            db.SaveChanges();
        }

        public void Update(Ticket item)
        {
            throw new NotImplementedException();
        }
    }
}
