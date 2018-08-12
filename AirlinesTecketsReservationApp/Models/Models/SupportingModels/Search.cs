using System;
using System.Collections.Generic;
using System.Text;

namespace AirlinesTicketsReservationApp.Models.Models.SupportingModels
{
     public class Search
     {
          public string From { get; set; }
          public string To { get; set; }
          public string FlightClass { get; set; }
          public DateTime Date { get; set; }

          public Search()
          {

          }

     }
}
