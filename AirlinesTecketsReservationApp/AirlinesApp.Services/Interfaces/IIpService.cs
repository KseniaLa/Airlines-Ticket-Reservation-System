using AirlinesApp.DataAccess.Models.Entities;
using AirlinesApp.DataPresentation;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AirlinesApp.Services.Interfaces
{
    public interface IIpService
    {
        Task AddUserIpAddress(int userId, string ip);


        Task<List<IpAddress>> GetUserIpAddressHistory(int userId);


        Task<List<IpAddressModel>> GetUserIpAddressLatest(int userId, int count);

    }
}
