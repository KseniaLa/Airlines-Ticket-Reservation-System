using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AirlinesTicketsReservationApp.Repositories;

namespace AirlinesTicketsReservationApp.Models
{
    public class AirlinesUnitOfWork
     {
          //private AirlinesContext _db = new AirlinesContext();
          private UserRepository _userRepository;
          // other Repositories

          /*public UserRepository Users
          {
               get
               {
                    if (_userRepository == null)
                         _userRepository = new UserRepository(_db);
                    return _userRepository;
               }
          }

          public async Task Save()
          {
               await _db.SaveChangesAsync();
          }

          private bool disposed = false;

          public virtual void Dispose(bool disposing)
          {
               if (!this.disposed)
               {
                    if (disposing)
                    {
                         _db.Dispose();
                    }
                    this.disposed = true;
               }
          }

          public void Dispose()
          {
               Dispose(true);
               GC.SuppressFinalize(this);
          }*/
     }
}
