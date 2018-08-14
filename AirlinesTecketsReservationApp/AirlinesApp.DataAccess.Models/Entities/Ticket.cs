using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AirlinesApp.DataAccess.Models.Entities
{
    public class Ticket : Entity
    {
        [Required]
        public int FlightId { get; set; }

        [Required]
        public string Category { get; set; }

        [Required]
        public int CompanyId { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public int Count { get; set; }

        public virtual Company Company { get; set; }
        public virtual Flight Flight { get; set; }
        public virtual ICollection<Order> Order { get; set; }
    }
}
