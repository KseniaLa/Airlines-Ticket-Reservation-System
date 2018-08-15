using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AirlinesApp.DataAccess.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace AirlinesApp.Services
{
    public class IpService : BaseService
    {
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
    }
}
