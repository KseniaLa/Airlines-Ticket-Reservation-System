using AirlinesTicketsReservationApp.Models;
using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AirlinesTicketsReservationApp.Repositories
{
     public class UserRepository : IRepository<User>
     {
          private AirlinesContext db;

          public UserRepository()
          {
               db = new AirlinesContext();
          }

          public async Task Add(User item)
          {
               await db.Users.AddAsync(item);
          }

          public void Delete(int id)
          {
               throw new NotImplementedException();
          }

          public void Dispose()
          {
               throw new NotImplementedException();
          }

          public async Task<User> GetItem(int id)
          {
               return await db.Users.FindAsync(id);
          }

          public async Task<User> GetUserByEmail(string email)
          {
               return await db.Users.Where(user => user.Email == email).FirstOrDefaultAsync();
          }

          public async Task Save()
          {
               await db.SaveChangesAsync();
          }

          public void Update(User item)
          {
               throw new NotImplementedException();
          }
     }
}
