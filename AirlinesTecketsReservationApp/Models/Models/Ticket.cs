using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public  class Ticket : Model
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
