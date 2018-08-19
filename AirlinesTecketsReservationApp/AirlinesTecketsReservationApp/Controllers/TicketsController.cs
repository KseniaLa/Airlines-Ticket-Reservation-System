using System.Collections.Generic;
using System.Threading.Tasks;
using AirlinesApp.DataAccess.Models.SupportingModels;
using AirlinesApp.Services;
using AirlinesApp.TokenManager;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AirlinesTicketsReservationApp.Controllers
{
    [Route("api/tickets")]
    public class TicketsController : Controller
    {
        private readonly TicketService _ticketService;
        private readonly CityService _cityService;
        public TicketsController()
        {
            _ticketService = new TicketService();
            _cityService = new CityService();
        }


        [AllowAnonymous]
        [HttpPost("search/{lang}")]
        public async Task<IActionResult> FindTickets([FromBody]SearchModel search, string lang)
        {
            try
            {
                await _cityService.UpdateCityRating(search.To);
                List<TicketModel> tickets = await _ticketService.GetSearchTickets(search, lang);
                return Ok(new { tickets });
            }
            catch
            {
                return BadRequest();
            }
        }

        [Authorize(Roles = Roles.Administrator)]
        [HttpPut("add")]
        public async Task<IActionResult> AddTickets([FromBody]TicketModel ticket)
        {
             await _ticketService.AddTicket(ticket);
             return Ok();
        }
    }
}
