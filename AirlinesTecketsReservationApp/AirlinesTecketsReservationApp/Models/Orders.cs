using System;
using System.Collections.Generic;

namespace AirlinesTicketsReservationApp.Models
{
    public partial class Orders
    {
        public int OrderId { get; set; }
        public int UserId { get; set; }
        public int TicketId { get; set; }
        public int Count { get; set; }

        public Tickets Ticket { get; set; }
        public Users User { get; set; }
    }
}
