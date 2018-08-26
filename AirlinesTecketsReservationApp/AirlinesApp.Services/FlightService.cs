using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AirlinesApp.DataAccess;
using AirlinesApp.DataAccess.Models.Entities;
using AirlinesApp.DataPresentation;
using AirlinesApp.Exceptions;
using AirlinesApp.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AirlinesApp.Services
{
    public class FlightService : BaseService, IFlightService, IScopedService
    {
        public FlightService(IUnitOfWork unitOfWork) : base(unitOfWork)
        {

        }

        public async Task<List<FlightModel>> GetFlights(string language)
        {
            List<Flight> rawFlights = await Db.Flights.GetAll().ToListAsync();

            List<FlightModel> flights = new List<FlightModel>();
            foreach (Flight fl in rawFlights)
            {
                flights.Add(new FlightModel
                {
                    Id = fl.Id,
                    From = fl.Departure.Translations.FirstOrDefault(t => t.Language.Name == language)?.Value,
                    To = fl.Destination.Translations.FirstOrDefault(t => t.Language.Name == language)?.Value,
                    Date = fl.DateTime
                });
            }
            return flights;
        }


        public async Task<Flight> AddFlight(FlightModel flight)
        {
            City fromCity = await Db.Cities
                 .FindBy(c => c.Translations.Any(tr => tr.Value.Equals(flight.From, StringComparison.InvariantCultureIgnoreCase)))
                 .FirstOrDefaultAsync();
            City toCity = await Db.Cities
                 .FindBy(c => c.Translations.Any(tr => tr.Value.Equals(flight.To, StringComparison.InvariantCultureIgnoreCase)))
                 .FirstOrDefaultAsync();

            if (fromCity == null || toCity == null)
            {
                throw new LocationException("City not found");
            }
            if (fromCity.Equals(toCity))
            {
                throw new LocationException("Departure and destination cities are equal");
            }
            DateTime dateTime = new DateTime(flight.Date.Year, flight.Date.Month, flight.Date.Day, flight.Date.Hour, flight.Date.Minute, 0, DateTimeKind.Local);
            Flight newFlight = new Flight
            {
                DateTime = dateTime,
                DepartureId = fromCity.Id,
                DestinationId = toCity.Id
            };

            await Db.Flights.Add(newFlight);
            await Db.Save();
            return newFlight;
        }
    }
}