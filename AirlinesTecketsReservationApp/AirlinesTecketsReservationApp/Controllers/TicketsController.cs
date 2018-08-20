using System.Collections.Generic;
using System.Threading.Tasks;
using AirlinesApp.DataAccess.Models.SupportingModels;
using AirlinesApp.Exceptions;
using AirlinesApp.Services;
using AirlinesApp.Services.Interfaces;
using AirlinesApp.TokenManager;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AirlinesTicketsReservationApp.Controllers
{
    [Route("api/tickets")]
    public class TicketsController : Controller
    {
        private readonly ITicketService _ticketService;
        private readonly ICityService _cityService;


        public TicketsController(ICityService cityService, ITicketService ticketService)
        {
            _ticketService = ticketService;
            _cityService = cityService;
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
        public async Task<IActionResult> AddTickets([FromBody]AddTicketModel ticket)
        {
             try
             {
                  await _ticketService.AddTicket(ticket);
                  return Ok();
             }
             catch (LocationException)
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
