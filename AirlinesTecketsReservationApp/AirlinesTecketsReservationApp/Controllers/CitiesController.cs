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
          private CityRepository db;

          public CitiesController()
          {
               db = new CityRepository();
          }

          // GET: api/cities
          [HttpGet]
          public IEnumerable<string> Get()
          {
               return new string[] { "city", "city" };
          }

          // GET api/<controller>/5
          [HttpGet("{id}")]
          public string Get(int id)
          {
               City city = db.GetCityWithTranslations(id);

               if (city != null && city.Translations != null)
               {
                    List<Translation> t = city.Translations.ToList();
                    return t[0].Value;
               }
               return "value";
          }

          // POST api/<controller>
          [HttpPost]
          public void Post([FromBody]string value)
          {
          }

          // PUT api/<controller>/5
          [HttpPut("{id}")]
          public void Put(int id, [FromBody]string value)
          {
          }

          // DELETE api/<controller>/5
          [HttpDelete("{id}")]
          public void Delete(int id)
          {
          }
     }
}
