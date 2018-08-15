using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AirlinesApp.DataAccess.Models.SupportingModels;
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

         [HttpPost("cart/{lang}")]
         public async Task<IActionResult> GetCartTickets([FromBody] string cart, string lang)
         {
              try
              {
                   List<CartItemModel> cartItems = JsonConvert.DeserializeObject<List<CartItemModel>>(cart);
                   List<TicketModel> tickets = await _ticketService.GetTicketsList(cartItems, lang);
                   return Ok(new { tickets });
              }
              catch
              {
                   return BadRequest();
              }

         }
     }
}
