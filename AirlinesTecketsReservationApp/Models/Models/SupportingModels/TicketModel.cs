using System;
using System.Collections.Generic;
using System.Text;

namespace AirlinesTicketsReservationApp.Models.Models.SupportingModels
{
    public class TicketModel
    {
          public string From { get; set; }
          public string To { get; set; }
          public string Company { get; set; }
          public DateTime Date { get; set; }
          public string Category { get; set; }
          public decimal Price { get; set; }
          public int TotalCount { get; set; }
          public int BookedCount { get; set; }
     }
}
