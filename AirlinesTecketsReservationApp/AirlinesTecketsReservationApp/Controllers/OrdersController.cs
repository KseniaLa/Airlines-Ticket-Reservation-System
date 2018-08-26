using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AirlinesApp.DataPresentation;
using AirlinesApp.Exceptions;
using AirlinesApp.Services;
using AirlinesApp.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AirlinesTicketsReservationApp.Controllers
{
     [Route("api/orders")]
     public class OrdersController : Controller
     {
          private readonly IOrderService _orderService;


          public OrdersController(IOrderService orderService)
          {
               _orderService = orderService;
          }

          [Authorize]
          [HttpGet("userorders/{language}")]
          public async Task<IActionResult> GetUserOrders(string language)
          {
               string email = HttpContext.User.FindFirst(ClaimTypes.Email).Value;
               List<TicketModel> orders = await _orderService.GetUserOrders(email, language);
               return Ok(new { orders });
          }

          [Authorize]
          [HttpPost("cart/{lang}")]
          public async Task<IActionResult> GetCartTickets([FromBody] string cart, string lang)
          {
               List<CartItemModel> cartItems = JsonConvert.DeserializeObject<List<CartItemModel>>(cart);
               List<TicketModel> tickets = await _orderService.GetTicketsList(cartItems, lang);
               return Ok(new { tickets });
          }

          [Authorize]
          [HttpPost("cart/submit")]
          public async Task<IActionResult> BookTickets([FromBody] string cart)
          {
               string email = HttpContext.User.FindFirst(ClaimTypes.Email).Value;
               List<CartItemModel> cartItems = JsonConvert.DeserializeObject<List<CartItemModel>>(cart);
               await _orderService.AddOrders(email, cartItems);
               return Ok();
          }

          [Authorize]
          [HttpPost("userorders/cancel")]
          public async Task<IActionResult> CancelTicket([FromBody] int id)
          {
               string email = HttpContext.User.FindFirst(ClaimTypes.Email).Value;
               await _orderService.CancelOrder(email, id);
               return Ok();
          }
     }
}
