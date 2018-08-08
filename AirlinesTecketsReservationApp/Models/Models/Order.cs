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

          public Ticket Ticket { get; set; }
          public User User { get; set; }
     }
}
