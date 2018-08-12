using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class Order : Model
    {
          [Required]
          public int UserId { get; set; }

          [Required]
          public int TicketId { get; set; }

          [Required]
          public int Count { get; set; }

          public virtual Ticket Ticket { get; set; }
          public virtual User User { get; set; }
     }
}
