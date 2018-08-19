using AirlinesApp.DataAccess.Models.Entities;
using AirlinesApp.DataAccess.Models.SupportingModels;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AirlinesApp.Services
{
    public class CityService : BaseService
    {
         public async Task<List<string>> GetCities(string language)
         {
              List<City> cities = await Db.Cities.GetAll().ToListAsync();
              List<string> cityNames = new List<string>();
              foreach (City city in cities)
              {
                   cityNames.Add(city.Translations.FirstOrDefault(t => t.Language.Name == language)?.Value);
              }
              return cityNames;
         }

          public async Task<List<CityModel>> GetTopCities(int topCount, string language)
        {
            List<City> rawCities = await (from c in Db.Cities.GetAll()
                                          orderby c.Rating descending
                                          select c).Take(topCount).ToListAsync();
            List<CityModel> cities = new List<CityModel>();
            foreach (City city in rawCities)
            {
                cities.Add(new CityModel
                {
                    Id = city.Id,
                    Url = "unknown",
                    Name = city.Translations.FirstOrDefault(t => t.Language.Name == language)?.Value
                });
            }
            return cities;
        }

        public async Task UpdateCityRating(string cityName)
        {
            City city = await Db.Cities.FindBy(c => c.Translations.Any(t => t.Value == cityName)).FirstOrDefaultAsync();
            if (city == null) return;
            city.Rating++;
            Db.Cities.Update(city);
            await Db.Save();
        }
    }
}
