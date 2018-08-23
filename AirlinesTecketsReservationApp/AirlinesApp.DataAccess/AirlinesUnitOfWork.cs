using AirlinesApp.DataAccess.Models.Entities;
using AirlinesApp.DataAccess.Repositories;
using System;
using System.Threading.Tasks;

namespace AirlinesApp.DataAccess
{
    public class AirlinesUnitOfWork : IUnitOfWork
    {
        private readonly AirlinesContext _db;
        private readonly IServiceProvider _serviceProvider;

        public IGenericRepository<User> Users => GetGenericRepository<User>();
        public IGenericRepository<City> Cities => GetGenericRepository<City>();
        public IGenericRepository<Company> Companies => GetGenericRepository<Company>();
        public IGenericRepository<Flight> Flights => GetGenericRepository<Flight>();
        public IGenericRepository<Ticket> Tickets => GetGenericRepository<Ticket>();
        public IGenericRepository<Translation> Translations => GetGenericRepository<Translation>();
        public IGenericRepository<Language> Languages => GetGenericRepository<Language>();
        public IGenericRepository<Order> Orders => GetGenericRepository<Order>();
        public IGenericRepository<IpAddress> IpAddresses => GetGenericRepository<IpAddress>();

        public AirlinesUnitOfWork(AirlinesContext context, IServiceProvider serviceProvider)
        {
            _db = context;
            _serviceProvider = serviceProvider;
        }

        private IGenericRepository<TEntity> GetGenericRepository<TEntity>() where TEntity : class
        {
            return (IGenericRepository<TEntity>)_serviceProvider.GetService(typeof(IGenericRepository<TEntity>));
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
