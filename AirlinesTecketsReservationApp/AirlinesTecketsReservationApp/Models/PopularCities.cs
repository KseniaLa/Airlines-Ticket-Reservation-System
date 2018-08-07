using System;
using System.Collections.Generic;

namespace AirlinesTicketsReservationApp.Models
{
    public partial class PopularCities
    {
        public int Id { get; set; }
        public int CityId { get; set; }
        public int Rating { get; set; }

        public Cities City { get; set; }
    }
}
