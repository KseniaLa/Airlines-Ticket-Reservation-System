﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AirlinesTicketsReservationApp.Models;
using AirlinesTicketsReservationApp.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace AirlinesTecketsReservationApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        IRepository<City> db;

        public ValuesController()
        {
             db = new CityRepository();
        }

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
               AirlinesContext context = new AirlinesContext();
               Language lang = new Language
               {
                    Id = 1,
                    Name = "ru"
               };
               var s = context.Languages.Find(1);
               City c = db.GetItem(1);
               return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
