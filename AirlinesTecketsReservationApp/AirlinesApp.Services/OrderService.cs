﻿using AirlinesApp.DataAccess.Models.Entities;
using AirlinesApp.DataAccess.Models.SupportingModels;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AirlinesApp.Services
{
    public class OrderService : BaseService
    {
        public async Task<List<TicketModel>> GetUserOrders(string email, string language)
        {
            User user = await Db.Users.FindBy(u => u.Email == email).FirstOrDefaultAsync();
            List<Order> orders = user.Orders.ToList();
            List<TicketModel> tickets = new List<TicketModel>();
            foreach (Order order in orders)
            {
                tickets.Add(new TicketModel
                {
                    Id = order.Id,
                    From = order.Ticket.Flight.Departure.Translations.FirstOrDefault(t => t.Language.Name == language)
                        ?.Value,
                    To = order.Ticket.Flight.Destination.Translations.FirstOrDefault(t => t.Language.Name == language)
                        ?.Value,
                    Company = order.Ticket.Company.Translations.FirstOrDefault(t => t.Language.Name == language)
                        ?.Value,
                    Date = order.Ticket.Flight.DateTime,
                    Category = order.Ticket.Category,
                    Price = order.Ticket.Price,
                    TotalCount = order.Ticket.Count,
                    BookedCount = order.Count
                });
            }
            return tickets;
        }

        public async Task<List<TicketModel>> GetTicketsList(List<CartItemModel> ticketSet, string language)
        {
            List<int> ids = new List<int>();
            foreach (CartItemModel item in ticketSet)
            {
                ids.Add(item.Ticket);
            }

            List<Ticket> rawTickets = await Db.Tickets.FindBy(t => ids.Contains(t.Id)).ToListAsync();
            List<TicketModel> tickets = new List<TicketModel>();
            foreach (Ticket ticket in rawTickets)
            {
                tickets.Add(new TicketModel
                {
                    Id = ticket.Id,
                    From = ticket.Flight.Departure.Translations.FirstOrDefault(t => t.Language.Name == language)?.Value,
                    To = ticket.Flight.Destination.Translations.FirstOrDefault(t => t.Language.Name == language)
                        ?.Value,
                    Company = ticket.Company.Translations.FirstOrDefault(t => t.Language.Name == language)
                        ?.Value,
                    Date = ticket.Flight.DateTime,
                    Category = ticket.Category,
                    Price = ticket.Price,
                    TotalCount = ticket.Count,
                    BookedCount = GetCountById(ticketSet, ticket.Id)
                });
            }

            return tickets;
        }

        private int GetCountById(List<CartItemModel> cart, int id)
        {
            foreach (CartItemModel item in cart)
            {
                if (item.Ticket == id)
                {
                    return item.Count;
                }
            }

            return 0;
        }

        public async Task AddOrders(string email, List<CartItemModel> cart)
        {
            User user = await Db.Users.FindBy(u => u.Email == email).FirstOrDefaultAsync();
            var ids = new List<int>();
            foreach (CartItemModel item in cart)
            {
                ids.Add(item.Ticket);
            }

            List<Ticket> rawTickets = await Db.Tickets.FindBy(t => ids.Contains(t.Id)).ToListAsync();
            foreach (Ticket ticket in rawTickets)
            {
                var ticketCount = GetCountById(cart, ticket.Id);
                ticket.Count -= ticketCount;
                Db.Tickets.Update(ticket);
                Order order = await Db.Orders.FindBy(o => o.UserId == user.Id && o.TicketId == ticket.Id)
                     .FirstOrDefaultAsync();
                if (order != null)
                {
                    order.Count += ticketCount;
                    Db.Orders.Update(order);
                }
                else
                {
                    var tempOrder = new Order
                    {
                        UserId = user.Id,
                        Count = ticketCount,
                        TicketId = ticket.Id
                    };
                    await Db.Orders.Add(tempOrder);
                }

            }

            await Db.Save();
        }

        public async Task CancelOrder(string email, int orderId)
        {
            User user = await Db.Users.FindBy(u => u.Email == email).FirstOrDefaultAsync();
            Order order = await Db.Orders.FindBy(o => o.UserId == user.Id && o.Id == orderId) //remove userid
                .FirstOrDefaultAsync();
            Ticket ticket = await Db.Tickets.FindBy(t => t.Id == order.TicketId).FirstOrDefaultAsync();
            if (ticket != null)
            {
                ticket.Count += order.Count;
                Db.Tickets.Update(ticket);
            }
            Db.Orders.Delete(order.Id);
            await Db.Save();
        }
    }
}
