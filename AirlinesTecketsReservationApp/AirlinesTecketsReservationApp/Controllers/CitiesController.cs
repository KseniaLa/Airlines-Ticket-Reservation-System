using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AirlinesTicketsReservationApp.Repositories;
using Microsoft.AspNetCore.Mvc;
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

          // GET api/cities/5
          [HttpGet("{lang}")]
          public string Get(string lang)
          {
               return "value";
          }
     }
}
