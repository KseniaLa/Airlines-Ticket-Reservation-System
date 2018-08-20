using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AirlinesApp.DataAccess.Models.SupportingModels;

namespace AirlinesApp.Services.Interfaces
{
    public interface ITicketService
    {
        Task<List<TicketModel>> GetSearchTickets(SearchModel search, string language);

        Task AddTicket(TicketModel ticket);
    }
}
