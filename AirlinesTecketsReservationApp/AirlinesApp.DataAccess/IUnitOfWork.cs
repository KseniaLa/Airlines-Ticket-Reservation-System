using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AirlinesApp.DataAccess.Models.Entities;
using AirlinesApp.DataAccess.Repositories;

namespace AirlinesApp.DataAccess
{
    public interface IUnitOfWork
    {
        IGenericRepository<User> Users { get; }
        IGenericRepository<City> Cities { get; }
        IGenericRepository<Company> Companies { get; }
        IGenericRepository<Flight> Flights { get; }
        IGenericRepository<Ticket> Tickets { get; }
        IGenericRepository<Translation> Translations { get; }
        IGenericRepository<Language> Languages { get; }
        IGenericRepository<Order> Orders { get; }
        IGenericRepository<IpAddress> IpAddresses { get; }

        Task Save();
    }
}
