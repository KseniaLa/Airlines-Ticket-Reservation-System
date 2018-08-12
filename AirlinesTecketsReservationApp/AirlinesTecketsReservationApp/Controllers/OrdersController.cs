using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
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
          [HttpGet("userorders")]
          public async Task<IActionResult> GetUserOrders(int id)
          {
               string email = HttpContext.User.FindFirst(ClaimTypes.Email).Value;
               List<Order> orders = await _orderService.GetUserOrders(email);
               return Ok(new { count = orders[0].Count});
          }
     }
}
