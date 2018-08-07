using System;
using System.Collections.Generic;

namespace AirlinesTicketsReservationApp.Models
{
    public partial class Tickets
    {
        public Tickets()
        {
            Orders = new HashSet<Orders>();
        }

        public int TicketId { get; set; }
        public int FlightId { get; set; }
        public string Category { get; set; }
        public int CompanyId { get; set; }
        public decimal Price { get; set; }
        public int Count { get; set; }

        public Companies Company { get; set; }
        public Flights Flight { get; set; }
        public ICollection<Orders> Orders { get; set; }
    }
}
