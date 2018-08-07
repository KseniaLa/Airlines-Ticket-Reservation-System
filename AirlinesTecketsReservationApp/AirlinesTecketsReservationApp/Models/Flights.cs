using System;
using System.Collections.Generic;

namespace AirlinesTicketsReservationApp.Models
{
    public partial class Flights
    {
        public Flights()
        {
            Tickets = new HashSet<Tickets>();
        }

        public int FlightId { get; set; }
        public int DepartureId { get; set; }
        public int DestinationId { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan Time { get; set; }

        public Cities Departure { get; set; }
        public Cities Destination { get; set; }
        public ICollection<Tickets> Tickets { get; set; }
    }
}
