﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AirlinesApp.DataAccess.Models.Entities;
using AirlinesApp.DataAccess.Models.SupportingModels;
using AirlinesApp.Exceptions;
using AirlinesApp.Services.Interfaces;
using AirlinesApp.TokenManager;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace AirlinesTicketsReservationApp.Controllers
{
     [Route("api/flights")]
     public class FlightsController : Controller
     {

          private readonly IFlightService _flightService;

          public FlightsController(IFlightService flightService)
          {
               _flightService = flightService;
          }

          // GET: api/flights
          [Authorize(Roles = Roles.Administrator)]
          [HttpGet("{lang}")]
          public async Task<IActionResult> Get(string lang)
          {
               try
               {
                    List<FlightModel> flights = await _flightService.GetFlights(lang);
                    return Ok(new { flights });
               }
               catch (Exception)
               {
                    return BadRequest();
               }
          }


          // PUT api/flights/add
          [Authorize(Roles = Roles.Administrator)]
          [HttpPut("add")]
          public async Task<IActionResult> AddFlight([FromBody]FlightModel flight)
          {
               try
               {
                    Flight fl = await _flightService.AddFlight(flight);
                    if (fl == null)
                    {
                         return BadRequest();
                    }
                    return Ok();
               }
               catch (LocationException)
               {
                    return BadRequest();
               }
               catch
               {
                    return BadRequest();
               }
          }

     }
}
