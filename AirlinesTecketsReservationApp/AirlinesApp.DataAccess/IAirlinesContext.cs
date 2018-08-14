using AirlinesApp.DataAccess.Models.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace AirlinesApp.DataAccess
{
    public interface IAirlinesContext
    {
        DbSet<City> Cities { get; set; }
        DbSet<Company> Companies { get; set; }
        DbSet<Flight> Flights { get; set; }
        DbSet<Order> Orders { get; set; }
        DbSet<Ticket> Tickets { get; set; }
        DbSet<User> Users { get; set; }
        DbSet<Language> Languages { get; set; }
        DbSet<Translation> Translations { get; set; }
    }
}
