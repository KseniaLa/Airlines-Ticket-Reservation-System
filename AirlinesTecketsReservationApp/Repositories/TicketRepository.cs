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

        public async Task Add(Ticket item)
        {
            await db.Tickets.AddAsync(item);
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public async Task<Ticket> GetItem(int id)
        {
            return await db.Tickets.FindAsync(id);
        }

        public async Task<IEnumerable<Ticket>> GetAll()
        {
            return await db.Tickets.ToListAsync();
        }

        public async Task Save()
        {
            await db.SaveChangesAsync();
        }

        public void Update(Ticket item)
        {
            throw new NotImplementedException();
        }
    }
}
