using AirlinesApp.DataAccess;

namespace AirlinesApp.Services
{
    public class BaseService
    {
        protected AirlinesUnitOfWork Db;

        public BaseService()
        {
            Db = new AirlinesUnitOfWork();
        }
    }
}
