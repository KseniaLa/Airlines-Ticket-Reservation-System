using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AirlinesApp.DataAccess.Models.Entities
{
    public class Flight : Entity
    {
        [Required]
        public int DepartureId { get; set; }

        [Required]
        public int DestinationId { get; set; }

        [Required]
        public DateTime DateTime { get; set; }

        public virtual City Departure { get; set; }
        public virtual City Destination { get; set; }
        public virtual ICollection<Ticket> Tickets { get; set; }
    }
}
