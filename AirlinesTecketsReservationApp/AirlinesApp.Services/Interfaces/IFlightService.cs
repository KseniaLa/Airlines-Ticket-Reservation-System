using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AirlinesApp.DataAccess.Models.Entities;
using AirlinesApp.DataAccess.Models.SupportingModels;

namespace AirlinesApp.Services.Interfaces
{
    public interface IFlightService
    {
         Task<List<FlightModel>> GetFlights(string language);

         Task<Flight> AddFlight(FlightModel flight);
    }
}
