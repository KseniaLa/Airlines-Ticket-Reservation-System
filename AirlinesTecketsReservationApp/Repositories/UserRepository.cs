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

          public void Add(User item)
          {
               db.Users.AddAsync(item);
               //db.Users.Add(item);
          }

          public void Delete(int id)
          {
               throw new NotImplementedException();
          }

          public void Dispose()
          {
               throw new NotImplementedException();
          }

          public Task<User> GetItem(int id)
          {
               return db.Users.FindAsync(id);
          }

          public Task<User> GetUserByEmail(string email)
          {
               return db.Users.Where(user => user.Email == email).FirstOrDefaultAsync();
          }

          public void Save()
          {
               db.SaveChangesAsync();
          }

          public void Update(User item)
          {
               throw new NotImplementedException();
          }
     }
}
