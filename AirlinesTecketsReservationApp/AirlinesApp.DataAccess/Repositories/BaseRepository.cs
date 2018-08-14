using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace AirlinesApp.DataAccess.Repositories
{
    public class BaseRepository<T> where T : class
    {
        private readonly DbSet<T> _dbSet;

        public BaseRepository(AirlinesContext context)
        {
            _dbSet = context.Set<T>();
        }

        public async Task Add(T item)
        {
            await _dbSet.AddAsync(item);
        }

        public IQueryable<T> GetAll()
        {
            return _dbSet; 
        }

        public IQueryable<T> FindBy(System.Linq.Expressions.Expression<Func<T, bool>> predicate)
        {
            IQueryable<T> query = _dbSet.Where(predicate);
            return query;
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public async Task<T> GetItem(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public void Update(T item)
        {
            throw new NotImplementedException();
        }
    }
}
