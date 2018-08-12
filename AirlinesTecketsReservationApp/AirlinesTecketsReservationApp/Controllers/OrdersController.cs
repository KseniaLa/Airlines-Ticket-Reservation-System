using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AirlinesTicketsReservationApp.Models.Models.SupportingModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace AirlinesTicketsReservationApp.Controllers
{
     [Route("api/orders")]
     public class OrdersController : Controller
     {
          private readonly OrderService _orderService;

          public OrdersController()
          {
               _orderService = new OrderService();
          }

          [Authorize]
          [HttpGet("userorders/{language}")]
          public async Task<IActionResult> GetUserOrders(string language)
          {
               string email = HttpContext.User.FindFirst(ClaimTypes.Email).Value;
               List<TicketModel> orders = await _orderService.GetUserOrders(email, language);
               return Ok(new { orders });
          }
     }
}
