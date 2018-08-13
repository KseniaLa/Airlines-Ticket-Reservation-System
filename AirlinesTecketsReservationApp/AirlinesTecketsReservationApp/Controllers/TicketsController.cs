using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AirlinesTicketsReservationApp.Models.Models.SupportingModels;
using Microsoft.AspNetCore.Authorization;
using AirlinesTicketsReservationApp.Repositories;
using Models;
using Services;
using Microsoft.AspNetCore.Mvc;


namespace AirlinesTicketsReservationApp.Controllers
{
    [Route("api/tickets")]
    public class TicketsController : Controller
    {
        private TicketService _ticketService;
        public TicketsController()
        {
            _ticketService = new TicketService();
        }


        [AllowAnonymous]
        [HttpPost("search/{lang}")]
        public async Task<IActionResult> FindTickets([FromBody]Search search, string lang)
        {
            try
            {
                List<TicketModel> tickets = await _ticketService.GetSearchTickets(search, lang);
                return Ok(new { tickets });
            }
            catch
            {
                return BadRequest();
            }
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost]
        public void AddTickets([FromBody]string value)
        {
        }
    }
}
