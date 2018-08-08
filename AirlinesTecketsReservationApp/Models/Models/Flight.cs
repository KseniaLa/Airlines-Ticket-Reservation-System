using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class Flight : Model
    {
          [Required]
          public int DepartureId { get; set; }

          [Required]
          public int DestinationId { get; set; }

          [Required]
          public DateTime Date { get; set; }

          [Required]
          public TimeSpan Time { get; set; }

          public virtual City Departure { get; set; }
          public virtual City Destination { get; set; }
          public virtual ICollection<Ticket> Tickets { get; set; } 
     }
}
