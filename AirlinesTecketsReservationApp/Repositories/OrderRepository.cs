using AirlinesTicketsReservationApp.Models;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AirlinesTicketsReservationApp.Repositories
{
     public class OrderRepository : IRepository<Order>
     {
          private AirlinesContext db;

          public OrderRepository()
          {
               db = new AirlinesContext();
          }

          public async Task Add(Order item)
          {
               await db.Orders.AddAsync(item);
          }

          public void Delete(int id)
          {
               throw new NotImplementedException();
          }

          public void Dispose()
          {
               throw new NotImplementedException();
          }

          public Task<Order> GetItem(int id)
          {
               return db.Orders.FindAsync(id);
          }

          public async Task Save()
          {
               await db.SaveChangesAsync();
          }

          public void Update(Order item)
          {
               throw new NotImplementedException();
          }
     }
}
