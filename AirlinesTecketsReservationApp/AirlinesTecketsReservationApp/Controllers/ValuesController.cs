using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AirlinesTecketsReservationApp.Controllers
{
     [Route("api/[controller]")]
     [ApiController]
     public class ValuesController : ControllerBase
     {
          public ValuesController()
          {

          }

          // GET api/values
          [HttpGet]
          public ActionResult<IEnumerable<string>> Get()
          {               
               return new string[] { "value1", "value2" };
          }
     }
}
