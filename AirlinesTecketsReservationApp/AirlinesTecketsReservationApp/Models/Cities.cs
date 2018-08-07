using System;
using System.Collections.Generic;

namespace AirlinesTicketsReservationApp.Models
{
    public partial class Cities
    {
        public Cities()
        {
            FlightsDeparture = new HashSet<Flights>();
            FlightsDestination = new HashSet<Flights>();
            PopularCities = new HashSet<PopularCities>();
        }

        public int CityId { get; set; }
        public string NameRu { get; set; }
        public string NameEn { get; set; }

        public ICollection<Flights> FlightsDeparture { get; set; }
        public ICollection<Flights> FlightsDestination { get; set; }
        public ICollection<PopularCities> PopularCities { get; set; }
    }
}
