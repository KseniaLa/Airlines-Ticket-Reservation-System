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
    }
}
