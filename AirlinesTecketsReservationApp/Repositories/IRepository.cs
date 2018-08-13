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
          Task Add(T item);
          void Update(T item);
          void Delete(int id);
          Task Save();
     }
}
