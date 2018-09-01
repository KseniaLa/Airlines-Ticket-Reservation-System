using System;
using System.Collections.Generic;
using System.Linq;
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
              int from = int.Parse(flight.From);
              int to = int.Parse(flight.To);
              if (from == to)
              {
                    throw new LocationException("Departure and destination cities are equal");
              }
            City fromCity = await Db.Cities
                    .FindBy(c => c.Id == from)
                    .FirstOrDefaultAsync();
               City toCity = await Db.Cities
                    .FindBy(c => c.Id == to)
                    .FirstOrDefaultAsync();

               if (fromCity == null || toCity == null)
               {
                    throw new LocationException("City not found");
               }
               DateTime dateTime = new DateTime(flight.Date.Year, flight.Date.Month, flight.Date.Day, flight.Date.Hour, flight.Date.Minute, 0, DateTimeKind.Local);
               if (dateTime < DateTime.Now)
               {
                    throw new LocationException("Invalid date");
               }
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