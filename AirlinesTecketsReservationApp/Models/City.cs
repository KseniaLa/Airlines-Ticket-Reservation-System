using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class City : Model
    {
          [Required]
          [MaxLength(50)]
          public string NameRu { get; set; }

          [Required]
          [MaxLength(50)]
          public string NameEn { get; set; }

          //public virtual ICollection<Flight> FlightsDeparture { get; set; }
          //public virtual ICollection<Flight> FlightsDestination { get; set; }
          //public virtual ICollection<Flight> Flights { get; set; }
          public virtual ICollection<PopularCity> PopularCities { get; set; }
     }
}
