using AirlinesTicketsReservationApp.Models;
using AirlinesTicketsReservationApp.Repositories;
using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
     public class TranslationsRepository : IRepository<Translation>
     {
          private AirlinesContext db;

          public TranslationsRepository()
          {
               db = new AirlinesContext();
          }

          public Task Add(Translation item)
          {
               throw new NotImplementedException();
          }

          public void Delete(int id)
          {
               throw new NotImplementedException();
          }

          public void Dispose()
          {
               throw new NotImplementedException();
          }

          public async Task<int> GetCityIdByName(string name)
          {
               Translation transl = await db.Translations.Where(t => t.Value == name).FirstOrDefaultAsync();
               return transl.Id;
          }

          public Task<Translation> GetItem(int id)
          {
               throw new NotImplementedException();
          }

          public Task Save()
          {
               throw new NotImplementedException();
          }

          public void Update(Translation item)
          {
               throw new NotImplementedException();
          }
     }
}