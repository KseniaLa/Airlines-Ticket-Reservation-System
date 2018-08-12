using AirlinesTicketsReservationApp.Repositories;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class OrderService
    {
          private readonly UserRepository _db;
          private readonly OrderRepository _dbOrder;

          public OrderService()
          {
               _db = new UserRepository();
               _dbOrder = new OrderRepository();
          }

          public async Task<List<Order>> GetUserOrders(string email)
          {
               User user = await _db.GetUserWithOrders(email);
               List<Order> orders = user.Orders.ToList();
               return orders;
          }
     }
}
