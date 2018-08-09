using AirlinesTicketsReservationApp.Models;
using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AirlinesTicketsReservationApp.Repositories
{
     public class CityRepository : IRepository<City>
     {
          private AirlinesContext db;

          public CityRepository()
          {
               db = new AirlinesContext();
          }

          public City GetCity(int id)
          {
               return db.Cities.Find(id);
          }

          public City GetCityWithTranslations(int id)
          {
               return db.Cities.Where(c => c.Id == id).Include(c => c.Translations).FirstOrDefault();
          }

          public void Add(City item)
          {
               db.Cities.Add(item);
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

          public void Update(City item)
          {
               throw new NotImplementedException();
          }

          public City GetItem(int id)
          {
               return db.Cities.Find(id);
          }
     }
}
