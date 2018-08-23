using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AirlinesApp.DataAccess;
using AirlinesApp.DataAccess.Models.Entities;
using AirlinesApp.DataAccess.Models.SupportingModels;
using AirlinesApp.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AirlinesApp.Services
{
    public class IpService : BaseService, IIpService, IScopedService
    {
        public IpService(IUnitOfWork unitOfWork) : base(unitOfWork)
        {

        }

        public async Task AddUserIpAddress(int userId, string ip)
        {
            IpAddress ipAddress = new IpAddress
            {
                Date = DateTime.Now,
                UserId = userId,
                IpAddr = ip
            };
            await Db.IpAddresses.Add(ipAddress);
            await Db.Save();
        }

        public async Task<List<IpAddress>> GetUserIpAddressHistory(int userId)
        {
            List<IpAddress> addresses = await Db.IpAddresses.FindBy(a => a.UserId == userId).ToListAsync();
            return addresses;
        }

        public async Task<List<IpAddressModel>> GetUserIpAddressLatest(int userId, int count)
        {
            List<IpAddress> addresses = await Db.IpAddresses.GetAll()
                .Where(ipAddress => ipAddress.UserId == userId).OrderByDescending(ipAddress => ipAddress.Date)
                .Take(count).ToListAsync();
            
            List<IpAddressModel> addr = new List<IpAddressModel>();
            foreach (IpAddress a in addresses)
            {
                addr.Add(new IpAddressModel
                {
                    Id = a.Id,
                    IpAddr = a.IpAddr,
                    Date = a.Date
                });
            }
            return addr;
        }
    }
}
