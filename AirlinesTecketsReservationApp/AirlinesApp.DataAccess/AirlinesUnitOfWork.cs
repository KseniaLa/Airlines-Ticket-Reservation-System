using AirlinesApp.DataAccess.Models.Entities;
using AirlinesApp.DataAccess.Repositories;
using System;
using System.Threading.Tasks;

namespace AirlinesApp.DataAccess
{
     public class AirlinesUnitOfWork
     {
          private readonly AirlinesContext _db = new AirlinesContext();
          private BaseRepository<User> _userRepository;
          private BaseRepository<City> _cityRepository;
          private BaseRepository<Company> _companyRepository;
          private BaseRepository<Flight> _flightRepository;
          private BaseRepository<Ticket> _ticketRepository;
          private BaseRepository<Translation> _translationRepository;
          private BaseRepository<Language> _languageRepository;
          private BaseRepository<Order> _orderRepository;
          private BaseRepository<IpAddress> _ipAddressRepository;


          public BaseRepository<User> Users
          {
               get
               {
                    if (_userRepository == null)
                         _userRepository = new BaseRepository<User>(_db);
                    return _userRepository;
               }
          }

          public BaseRepository<City> Cities
          {
               get
               {
                    if (_cityRepository == null)
                         _cityRepository = new BaseRepository<City>(_db);
                    return _cityRepository;
               }
          }

          public BaseRepository<Company> Companies
          {
               get
               {
                    if (_companyRepository == null)
                         _companyRepository = new BaseRepository<Company>(_db);
                    return _companyRepository;
               }
          }

          public BaseRepository<Flight> Flights
          {
               get
               {
                    if (_flightRepository == null)
                         _flightRepository = new BaseRepository<Flight>(_db);
                    return _flightRepository;
               }
          }

          public BaseRepository<Ticket> Tickets
          {
               get
               {
                    if (_ticketRepository == null)
                         _ticketRepository = new BaseRepository<Ticket>(_db);
                    return _ticketRepository;
               }
          }

          public BaseRepository<Translation> Translations
          {
               get
               {
                    if (_translationRepository == null)
                         _translationRepository = new BaseRepository<Translation>(_db);
                    return _translationRepository;
               }
          }

          public BaseRepository<Language> Languages
          {
               get
               {
                    if (_languageRepository == null)
                         _languageRepository = new BaseRepository<Language>(_db);
                    return _languageRepository;
               }
          }

          public BaseRepository<Order> Orders
          {
               get
               {
                    if (_orderRepository == null)
                         _orderRepository = new BaseRepository<Order>(_db);
                    return _orderRepository;
               }
          }

          public BaseRepository<IpAddress> IpAddresses
          {
               get
               {
                    if (_ipAddressRepository == null)
                         _ipAddressRepository = new BaseRepository<IpAddress>(_db);
                    return _ipAddressRepository;
               }
          }

          public async Task Save()
          {
               await _db.SaveChangesAsync();
          }

          private bool _disposed;

          public virtual void Dispose(bool disposing)
          {
               if (!_disposed)
               {
                    if (disposing)
                    {
                         _db.Dispose();
                    }
                    _disposed = true;
               }
          }

          public void Dispose()
          {
               Dispose(true);
               GC.SuppressFinalize(this);
          }
     }
}
