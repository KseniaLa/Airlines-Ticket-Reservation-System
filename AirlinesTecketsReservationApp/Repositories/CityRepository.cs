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

        public async Task<City> GetCity(int id)
        {
            return await db.Cities.FindAsync(id);
        }

        public async Task<City> GetCityWithTranslations(int id)
        {
            return await db.Cities.Where(c => c.Id == id).Include(c => c.Translations).FirstOrDefaultAsync();
        }

        public Task<List<City>> GetTopCitiesByRating(int topCount)
        {
            var cities = (from c in db.Cities
                          orderby c.Rating descending
                          select c).Take(topCount).ToListAsync();
            return cities;
        }

        public async void Add(City item)
        {
            await db.Cities.AddAsync(item);
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public async void Save()
        {
            await db.SaveChangesAsync();
        }

        public void Update(City item)
        {
            throw new NotImplementedException();
        }

        public async Task<City> GetItem(int id)
        {
            return await db.Cities.FindAsync(id);
        }
    }
}
