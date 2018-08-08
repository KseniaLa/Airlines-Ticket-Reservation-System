using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;
using Models;

namespace AirlinesTicketsReservationApp.Models
{
    public interface IAirlinesContext
    {
          DbSet<City> Cities { get; set; }
          DbSet<Company> Companies { get; set; }
          DbSet<Flight> Flights { get; set; }
          DbSet<Order> Orders { get; set; }
          DbSet<PopularCity> PopularCities { get; set; }
          DbSet<Ticket> Tickets { get; set; }
          DbSet<User> Users { get; set; }
    }

     public class AirlinesContext : DbContext, IAirlinesContext
     {
          public AirlinesContext(DbContextOptions options) : base(options)
          {

          }

          public DbSet<City> Cities { get; set; }
          public DbSet<Company> Companies { get; set; }
          public DbSet<Flight> Flights { get; set; }
          public DbSet<Order> Orders { get; set; }
          public DbSet<PopularCity> PopularCities { get; set; }
          public DbSet<Ticket> Tickets { get; set; }
          public DbSet<User> Users { get; set; }
     }
}
