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

          public void Add(Flight item)
          {
               db.Flights.AddAsync(item);
          }

          public void Delete(int id)
          {
               throw new NotImplementedException();
          }

          public void Dispose()
          {
               throw new NotImplementedException();
          }

          public Task<Flight> GetItem(int id)
          {
               return db.Flights.FindAsync(id);
          }

          public void Save()
          {
               db.SaveChanges();
          }

          public void Update(Flight item)
          {
               throw new NotImplementedException();
          }
     }
}
