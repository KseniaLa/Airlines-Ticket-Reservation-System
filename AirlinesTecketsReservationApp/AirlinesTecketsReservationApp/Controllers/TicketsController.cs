using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AirlinesTicketsReservationApp.Models.Models.SupportingModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AirlinesTicketsReservationApp.Controllers
{
    [Route("api/tickets")]
    public class TicketsController : Controller
    {
        [AllowAnonymous]
        [HttpPost("search/{lang}")]
        public IActionResult FindTickets([FromBody]Search search, string lang)
        {
            return Ok();
        }

        [HttpPost]
        public void AddTickets([FromBody]string value)
        {
        }
    }
}
