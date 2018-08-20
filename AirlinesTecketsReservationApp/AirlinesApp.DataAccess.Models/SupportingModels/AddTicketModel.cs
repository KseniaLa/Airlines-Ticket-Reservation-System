using System;
using System.Collections.Generic;
using System.Text;

namespace AirlinesApp.DataAccess.Models.SupportingModels
{
     public class AddTicketModel
     {
          public int FlightId { get; set; }
          public string Category { get; set; }
          public string Company { get; set; }
          public decimal Price { get; set; }
          public int Count { get; set; }
     }
}
