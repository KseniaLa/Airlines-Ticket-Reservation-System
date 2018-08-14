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
        public TicketsController()
        {
            _ticketService = new TicketService();
        }


        [AllowAnonymous]
        [HttpPost("search/{lang}")]
        public async Task<IActionResult> FindTickets([FromBody]SearchModel search, string lang)
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

        [Authorize(Roles = Roles.Administrator)]
        [HttpPost]
        public void AddTickets([FromBody]string value)
        {
        }
    }
}
