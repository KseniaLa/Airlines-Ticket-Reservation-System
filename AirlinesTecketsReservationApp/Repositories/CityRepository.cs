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

        public Task<City> GetCity(int id)
        {
            return db.Cities.FindAsync(id);
        }

        public Task<City> GetCityWithTranslations(int id)
        {
            return db.Cities.Where(c => c.Id == id).Include(c => c.Translations).FirstOrDefaultAsync();
        }

        public Task<List<City>> GetTopCitiesByRating(int topCount)
        {
            var cities = (from c in db.Cities
                          orderby c.Rating descending
                          select c).Take(topCount).ToListAsync();
            return cities;
        }

        public void Add(City item)
        {
            db.Cities.AddAsync(item);
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

        public Task<City> GetItem(int id)
        {
            return db.Cities.FindAsync(id);
        }
    }
}
