using AirlinesApp.DataAccess;

namespace AirlinesApp.Services
{
    public abstract class BaseService
    {
        protected IUnitOfWork Db;

        public BaseService(IUnitOfWork unitOfWork)
        {
            Db = unitOfWork;
        }
    }
}
