using System;
using System.Collections.Generic;
using System.Text;

namespace AirlinesApp.DataAccess.Models.SupportingModels
{
     public class FlightModel
     {
          public int Id { get; set; }
          public string From { get; set; }
          public string To { get; set; }
          public DateTime Date { get; set; }
     }
}
