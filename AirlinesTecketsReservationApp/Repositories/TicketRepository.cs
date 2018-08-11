using AirlinesTicketsReservationApp.Models;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
               db.Tickets.Add(item);
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
