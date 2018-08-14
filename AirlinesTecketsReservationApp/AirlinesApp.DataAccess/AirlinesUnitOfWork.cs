﻿using AirlinesApp.DataAccess.Models.Entities;
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
        private BaseRepository<Flight> _flightRepository;
        private BaseRepository<Ticket> _ticketRepository;
        private BaseRepository<Translation> _translationRepository;
        private BaseRepository<Order> _orderRepository;

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

        public BaseRepository<Order> Orders
        {
            get
            {
                if (_orderRepository == null)
                    _orderRepository = new BaseRepository<Order>(_db);
                return _orderRepository;
            }
        }

        public async Task Save()
        {
             await _db.SaveChangesAsync();
        }

        private bool _disposed = false;

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
