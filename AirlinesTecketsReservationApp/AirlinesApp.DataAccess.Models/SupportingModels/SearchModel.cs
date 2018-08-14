using System;
using System.Collections.Generic;
using System.Text;

namespace AirlinesApp.DataAccess.Models.SupportingModels
{
    public class SearchModel
    {
        public string From { get; set; }
        public string To { get; set; }
        public string FlightClass { get; set; }
        public DateTime Date { get; set; }

        public SearchModel()
        {

        }

    }
}
