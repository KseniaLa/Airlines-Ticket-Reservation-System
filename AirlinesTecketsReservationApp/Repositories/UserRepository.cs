using AirlinesTicketsReservationApp.Models;
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
               db.Users.Add(item);
          }

          public void Delete(int id)
          {
               throw new NotImplementedException();
          }

          public void Dispose()
          {
               throw new NotImplementedException();
          }

          public User GetItem(int id)
          {
               return db.Users.Find(id);
          }

          public User GetUserByEmail(string email)
          {
               return db.Users.Where(user => user.Email == email).FirstOrDefault();
          }

          public void Save()
          {
               db.SaveChanges();
          }

          public void Update(User item)
          {
               throw new NotImplementedException();
          }
     }
}
