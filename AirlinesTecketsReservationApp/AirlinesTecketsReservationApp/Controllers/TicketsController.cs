using System.Collections.Generic;
using System.Threading.Tasks;
using AirlinesApp.DataAccess.Models.Entities;
using AirlinesApp.DataPresentation;
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
          [HttpPost("search/{lang}/{count}/{page}")]
          public async Task<IActionResult> FindTickets([FromBody]SearchModel search, string lang, int count, int page)
          {
               if (search.IsInitial)
               {
                    await _cityService.UpdateCityRating(search.To);
               } 
               List<Ticket> rawTickets = await _ticketService.GetRawTickets(search);
               List<TicketModel> pageTickets = _ticketService.GetPageItems(rawTickets, lang, count, page);
               return Ok(new { tickets = pageTickets, count = rawTickets.Count });
          }

          [Authorize(Roles = Roles.Administrator)]
          [HttpPut("add")]
          public async Task<IActionResult> AddTickets([FromBody]AddTicketModel ticket)
          {
               await _ticketService.AddTicket(ticket);
               return Ok();
          }
     }
}
