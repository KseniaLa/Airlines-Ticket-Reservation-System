using AirlinesTicketsReservationApp.Models;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AirlinesTicketsReservationApp.Repositories
{
     public class FlightRepository : IRepository<Flight>
     {
          private AirlinesContext db;

          public FlightRepository()
          {
               db = new AirlinesContext();
          }

          public async Task Add(Flight item)
          {
               await db.Flights.AddAsync(item);
          }

          public void Delete(int id)
          {
               throw new NotImplementedException();
          }

          public void Dispose()
          {
               throw new NotImplementedException();
          }

          public async Task<Flight> GetItem(int id)
          {
               return await db.Flights.FindAsync(id);
          }

          public async Task Save()
          {
               await db.SaveChangesAsync();
          }

          public void Update(Flight item)
          {
               throw new NotImplementedException();
          }
     }
}
