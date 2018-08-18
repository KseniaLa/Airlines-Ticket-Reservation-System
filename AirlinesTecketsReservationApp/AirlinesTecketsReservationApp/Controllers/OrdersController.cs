using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AirlinesApp.DataAccess.Models.SupportingModels;
using AirlinesApp.Exceptions;
using AirlinesApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace AirlinesTicketsReservationApp.Controllers
{
     [Route("api/orders")]
     public class OrdersController : Controller
     {
          private readonly OrderService _orderService;
          private readonly TicketService _ticketService;


          public OrdersController()
          {
               _orderService = new OrderService();
               _ticketService = new TicketService();
          }

          [Authorize]
          [HttpGet("userorders/{language}")]
          public async Task<IActionResult> GetUserOrders(string language)
          {
               try
               {
                    string email = HttpContext.User.FindFirst(ClaimTypes.Email).Value;
                    List<TicketModel> orders = await _orderService.GetUserOrders(email, language);
                    return Ok(new { orders });
               }
               catch
               {
                    return BadRequest();
               }

          }

          [Authorize]
          [HttpPost("cart/{lang}")]
          public async Task<IActionResult> GetCartTickets([FromBody] string cart, string lang)
          {
               try
               {
                    List<CartItemModel> cartItems = JsonConvert.DeserializeObject<List<CartItemModel>>(cart);
                    List<TicketModel> tickets = await _orderService.GetTicketsList(cartItems, lang);
                    return Ok(new { tickets });
               }
               catch
               {
                    return BadRequest();
               }

          }

          [Authorize]
          [HttpPost("cart/submit")]
          public async Task<IActionResult> BookTickets([FromBody] string cart)
          {
               try
               {
                    string email = HttpContext.User.FindFirst(ClaimTypes.Email).Value;
                    List<CartItemModel> cartItems = JsonConvert.DeserializeObject<List<CartItemModel>>(cart);
                    await _orderService.AddOrders(email, cartItems);
                    return Ok();
               }
               catch (BookingException)
               {
                    return BadRequest();
               }
               catch
               {
                    return BadRequest();
               }
          }

          [Authorize]
          [HttpPost("userorders/cancel")]
          public async Task<IActionResult> CancelTicket([FromBody] int id)
          {
               try
               {
                    string email = HttpContext.User.FindFirst(ClaimTypes.Email).Value;
                    await _orderService.CancelOrder(email, id);
                    return Ok();
               }
               catch
               {
                    return BadRequest();
               }
          }
     }
}
