using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AirlinesApp.Services;
using AirlinesApp.DataAccess.Models.SupportingModels;
using AirlinesApp.Exceptions;
using AirlinesApp.TokenManager;
using Newtonsoft.Json;

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
            catch (Exception)
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

        [Authorize(Roles = Roles.Administrator)]
        [HttpPut("add")]
        public async Task<IActionResult> AddCity([FromBody] string city)
        {
            try
            {
                List<TranslationModel> cityTranslations = JsonConvert.DeserializeObject<List<TranslationModel>>(city);
                await _cityService.AddCity(cityTranslations);
                return Ok();
            }
            catch (LocationException)
            {
                return BadRequest();
            }
            catch (LanguageException)
            {
                return BadRequest();
            }
            catch
            {
                return BadRequest();
            }

        }
    }
}
