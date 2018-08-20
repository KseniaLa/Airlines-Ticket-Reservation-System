using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AirlinesApp.DataAccess.Models.SupportingModels;

namespace AirlinesApp.Services.Interfaces
{
    public interface IOrderService
    {
        Task<List<TicketModel>> GetUserOrders(string email, string language);


        Task<List<TicketModel>> GetTicketsList(List<CartItemModel> ticketSet, string language);


        Task AddOrders(string email, List<CartItemModel> cart);


        Task CancelOrder(string email, int orderId);
    }
}
