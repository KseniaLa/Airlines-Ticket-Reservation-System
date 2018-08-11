using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AirlinesTicketsReservationApp.Repositories
{
    interface IRepository<T> : IDisposable
        where T : class
    {
          Task<T> GetItem(int id);
          void Add(T item);
          void Update(T item);
          void Delete(int id);
          void Save();
     }
}
