using System;
using AirlinesApp.DataAccess.Models.Entities;
using AirlinesApp.DataAccess.Models.SupportingModels;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AirlinesApp.Exceptions;

namespace AirlinesApp.Services
{
     public class TicketService : BaseService
     {
          public async Task<List<TicketModel>> GetSearchTickets(SearchModel search, string language)
          {
               IQueryable<Ticket> rawTickets = Db.Tickets.GetAll();
               List<Ticket> foundTickets = await (from t in rawTickets
                                                  where t.Category == search.FlightClass
                                                  where t.Flight.DateTime.Date == search.Date.Date
                                                  where t.Flight.Departure.Translations.Any(tr => tr.Value.ToLower() == search.From.ToLower())
                                                  where t.Flight.Destination.Translations.Any(tr => tr.Value.ToLower() == search.To.ToLower())
                                                  where t.Count > 0
                                                  select t).ToListAsync();
               List<TicketModel> tickets = new List<TicketModel>();
               foreach (Ticket ticket in foundTickets)
               {
                    tickets.Add(new TicketModel
                    {
                         Id = ticket.Id,
                         From = ticket.Flight.Departure.Translations.FirstOrDefault(t => t.Language.Name == language)?.Value,
                         To = ticket.Flight.Destination.Translations.FirstOrDefault(t => t.Language.Name == language)
                            ?.Value,
                         Company = ticket.Company.Translations.FirstOrDefault(t => t.Language.Name == language)
                            ?.Value,
                         Date = ticket.Flight.DateTime,
                         Category = ticket.Category,
                         Price = ticket.Price,
                         TotalCount = ticket.Count,
                         BookedCount = ticket.Count
                    });
               }
               return tickets;
          }


          public async Task AddTicket(TicketModel ticket)
          {
               City fromCity = await Db.Cities
                    .FindBy(c => c.Translations.Any(tr => tr.Value.ToLower() == ticket.From.ToLower()))
                    .FirstOrDefaultAsync();
               City toCity = await Db.Cities
                    .FindBy(c => c.Translations.Any(tr => tr.Value.ToLower() == ticket.To.ToLower()))
                    .FirstOrDefaultAsync();
               Company company = await Db.Companies
                    .FindBy(c => c.Translations.Any(tr => tr.Value.ToLower() == ticket.Company.ToLower()))
                    .FirstOrDefaultAsync();
               if (fromCity == null || toCity == null)
               {
                    throw new LocationException("City not found");
               }
               if (company == null)
               {
                    throw new LocationException("Company not found");
               }
               if (fromCity.Equals(toCity))
               {
                    throw new LocationException("Departure and destination cities are equal");
               }
               int flightId = await AddFlight(fromCity, toCity, ticket.Date);
               Ticket testTicket = await Db.Tickets
                    .FindBy(t => t.FlightId == flightId && t.CompanyId == company.Id && t.Category == ticket.Category)
                    .FirstOrDefaultAsync();
               if (testTicket != null)
               {
                    testTicket.Count = ticket.TotalCount;
                    testTicket.Price = ticket.Price;
                    Db.Tickets.Update(testTicket);
                    await Db.Save();
                    return;
               }
               Ticket ticketItem = new Ticket
               {
                    FlightId = flightId,
                    CompanyId = company.Id,
                    Category = ticket.Category,
                    Price = ticket.Price,
                    Count = ticket.TotalCount
               };
               await Db.Tickets.Add(ticketItem);
               await Db.Save();
          }

          private async Task<int> AddFlight(City from, City to, DateTime date)
          {
               DateTime dateTime = new DateTime(date.Year, date.Month, date.Day, date.Hour, date.Minute, 0, DateTimeKind.Local);
               Flight testFlight = await Db.Flights
                                   .FindBy(fl => fl.DepartureId == from.Id && fl.DestinationId == to.Id && fl.DateTime == dateTime)
                                   .FirstOrDefaultAsync();
               if (testFlight != null)
               {
                    return testFlight.Id;
               }
               Flight flight = new Flight
               {
                    DateTime = dateTime,
                    DepartureId = from.Id,
                    DestinationId = to.Id
               };
               await Db.Flights.Add(flight);
               await Db.Save();
               return flight.Id;
          }
     }
}
