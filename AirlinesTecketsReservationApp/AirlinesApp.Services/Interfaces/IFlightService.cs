using System.Collections.Generic;
using System.Threading.Tasks;
using AirlinesApp.DataAccess.Models.Entities;
using AirlinesApp.DataPresentation;

namespace AirlinesApp.Services.Interfaces
{
    public interface IFlightService
    {
         Task<List<FlightModel>> GetFlights(string language);

         Task<Flight> AddFlight(FlightModel flight);
    }
}
