using System;
using System.Linq;
using System.Threading.Tasks;

namespace AirlinesApp.DataAccess.Repositories
{
    public interface IGenericRepository<T> where T : class
    {
        Task Add(T item);

        IQueryable<T> GetAll();

        IQueryable<T> FindBy(System.Linq.Expressions.Expression<Func<T, bool>> predicate);

        void Delete(int id);

        void Dispose();

        Task<T> GetItem(int id);

        void Update(T item);
    }
}
