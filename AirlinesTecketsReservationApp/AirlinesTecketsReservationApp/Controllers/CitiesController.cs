using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AirlinesApp.Services;
using AirlinesApp.DataAccess.Models.SupportingModels;

namespace AirlinesTicketsReservationApp.Controllers
{
    [Route("api/cities")]
    public class CitiesController : ControllerBase
    {
        private CityService _cityService;

        public CitiesController()
        {
            _cityService = new CityService();
        }

        // GET api/cities/ru
        [AllowAnonymous]
        [HttpGet("{lang}")]
        public async Task<IActionResult> Get(string lang)
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
    }
}
