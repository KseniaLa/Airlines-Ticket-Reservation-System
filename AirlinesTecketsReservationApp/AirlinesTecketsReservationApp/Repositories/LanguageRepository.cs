using AirlinesTicketsReservationApp.Models;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AirlinesTicketsReservationApp.Repositories
{
     public class LanguageRepository : IRepository<Language>
     {
          private AirlinesContext db;

          public LanguageRepository()
          {
               db = new AirlinesContext();
          }

          public Language GetItem(int id)
          {
               return db.Languages.Find(id);
          }

          public void Add(Language item)
          {
               db.Languages.Add(item);
          }

          public void Delete(int id)
          {
               throw new NotImplementedException();
          }

          public void Dispose()
          {
               throw new NotImplementedException();
          }

          public void Save()
          {
               db.SaveChanges();
          }

          public void Update(Language item)
          {
               throw new NotImplementedException();
          }
     }
}
