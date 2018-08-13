using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using AirlinesTicketsReservationApp.Repositories;
using Microsoft.AspNetCore.Mvc;
using AirlinesTicketsReservationApp.Models.Models.SupportingModels;
using Models;

namespace AirlinesTicketsReservationApp.Controllers
{
    [Route("api/cities")]
    public class CitiesController : ControllerBase
    {
        private CityRepository _db;

        public CitiesController()
        {
            _db = new CityRepository();
        }

        // GET api/cities/ru
        [AllowAnonymous]
        [HttpGet("{lang}")]
        public async Task<IActionResult> Get(string lang)
        {
            try
            {
                List<City> rawCities = await _db.GetTopCitiesByRating(6);
                List<CityModel> cities = new List<CityModel>();
                foreach (City city in rawCities)
                {
                    cities.Add(new CityModel
                    {
                        Url = "unknown",
                        Name = city.Translations.Where(t => t.Language.Name == lang).FirstOrDefault().Value
                    });
                }
                return Ok(new { cities });
            }
            catch
            {
                return BadRequest();
            }

        }
    }
}
