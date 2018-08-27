using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AirlinesApp.DataPresentation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AirlinesApp.Services;
using AirlinesApp.Exceptions;
using AirlinesApp.Services.Interfaces;
using AirlinesApp.TokenManager;
using Newtonsoft.Json;

namespace AirlinesTicketsReservationApp.Controllers
{
     [Route("api/cities")]
     public class CitiesController : ControllerBase
     {
          private readonly ICityService _cityService;

          public CitiesController(ICityService cityService)
          {
               _cityService = cityService;
          }

          // GET api/cities/popular/ru
          [AllowAnonymous]
          [HttpGet("popular/{lang}")]
          public async Task<IActionResult> GetPopularCities(string lang)
          {
               List<CityModel> cities = await _cityService.GetTopCities(6, lang);
               return Ok(new { cities });
          }

          [Authorize(Roles = Roles.Administrator)]
          [HttpGet("{lang}")]
          public async Task<IActionResult> GetAllCities(string lang)
          {
               //List<string> cities = await _cityService.GetCities(lang);
               List<CityTranslationModel> cities = await _cityService.GetCitiesWithTranslations(lang);
               return Ok(new { cities = cities.ToArray() });
          }

         
         [Authorize(Roles = Roles.Administrator)]
         [HttpGet("list/{lang}")]
         public async Task<IActionResult> GetAvailableCities(string lang)
         {
             List<CityModel> cities = await _cityService.GetAllCities(lang);
             return Ok(new { cities });
         }



        [Authorize(Roles = Roles.Administrator)]
          [HttpPut("add")]
          public async Task<IActionResult> AddCity([FromBody] List<TranslationModel> cityTranslations)
          {
               await _cityService.AddCity(cityTranslations);
               return Ok();
          }
     }
}
