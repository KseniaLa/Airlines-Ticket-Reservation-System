using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AirlinesApp.Services;
using AirlinesApp.DataAccess.Models.SupportingModels;
using AirlinesApp.TokenManager;

namespace AirlinesTicketsReservationApp.Controllers
{
    [Route("api/cities")]
    public class CitiesController : ControllerBase
    {
        private readonly CityService _cityService;

        public CitiesController()
        {
            _cityService = new CityService();
        }

        // GET api/cities/popular/ru
        [AllowAnonymous]
        [HttpGet("popular/{lang}")]
        public async Task<IActionResult> GetPopularCities(string lang)
        {
            try
            {
                List<CityModel> cities = await _cityService.GetTopCities(6, lang);
                return Ok(new { cities });
            }
            catch
            {
                return BadRequest();
            }

        }

         [Authorize(Roles = Roles.Administrator)]
         [HttpGet("{lang}")]
         public async Task<IActionResult> GetAllCities(string lang)
         {
              try
              {
                   List<string> cities = await _cityService.GetCities(lang);
                   return Ok(new { cities = cities.ToArray() });
              }
              catch
              {
                   return BadRequest();
              }

         }
     }
}
