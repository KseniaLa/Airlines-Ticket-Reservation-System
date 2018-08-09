using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AirlinesTicketsReservationApp.Repositories
{
    interface IRepository<T> : IDisposable
        where T : class
    {
          T GetItem(int id);
          void Add(T item); // создание объекта
          void Update(T item); // обновление объекта
          void Delete(int id); // удаление объекта по id
          void Save();  // сохранение изменений
     }
}
