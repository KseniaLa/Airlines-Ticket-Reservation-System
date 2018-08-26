using AirlinesApp.DataAccess.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Security.Cryptography;
using System.Threading.Tasks;
using AirlinesApp.DataAccess;
using AirlinesApp.Services.Interfaces;
using AirlinesApp.DataPresentation;
using AutoMapper;

namespace AirlinesApp.Services
{
     public class AccountService : BaseService, IAccountService, IScopedService
     {
          private readonly int _iterationsCount;
          private readonly int _saltSize;
          private readonly int _hashedPassSize;
          private readonly IMapper _mapper;

          public AccountService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork)
          {
               //IConfiguration configuration = new ConfigurationBuilder()
               //    .SetBasePath(Directory.GetCurrentDirectory())
               //    .AddJsonFile("appsettings.json").Build();
               IConfiguration configuration = ConfigBuilder.GetConfigRoot(Directory.GetCurrentDirectory());
               _iterationsCount = int.Parse(configuration["PasswordHashing:IterationsCount"]);
               _saltSize = int.Parse(configuration["PasswordHashing:SaltSize"]);
               _hashedPassSize = int.Parse(configuration["PasswordHashing:HashedPasswordSize"]);
               _mapper = mapper;
          }

          public async Task<User> TryAuthenticate(string email, string password)
          {
               try
               {
                    if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
                    {
                         return null;
                    }
                    var user = await Db.Users.FindBy(u => u.Email == email).FirstOrDefaultAsync();
                    if (user == null) return null;
                    return VerifyPassword(user.PasswordHash, password) ? user : null;
               }
               catch (Exception)
               {
                    return null;
               }
          }

          public async Task<User> SignUp(SignupModel registrationInfo)
          {
               if (string.IsNullOrEmpty(registrationInfo.Name) || string.IsNullOrEmpty(registrationInfo.Surname)
                    || string.IsNullOrEmpty(registrationInfo.Email) || string.IsNullOrEmpty(registrationInfo.Password))
               {
                    return null;
               }

               User searchUser = await Db.Users.FindBy(u => u.Email == registrationInfo.Email).FirstOrDefaultAsync();
               bool userExists = searchUser != null;
               if (!userExists)
               {
                    User user = _mapper.Map<SignupModel, User>(registrationInfo);
                    user.PasswordHash = HashPassword(user.PasswordHash);

                    await Db.Users.Add(user);
                    await Db.Save();

                    return user;
               }

               return null;
          }

          public async Task<User> GetUserByEmail(string email)
          {
               User user = await Db.Users.FindBy(u => u.Email == email).FirstOrDefaultAsync();
               return user;
          }


          private string HashPassword(string password)
          {
               byte[] salt;
               byte[] buffer;
               using (Rfc2898DeriveBytes bytes = new Rfc2898DeriveBytes(password, _saltSize, _iterationsCount))
               {
                    salt = bytes.Salt;
                    buffer = bytes.GetBytes(32);
               }
               byte[] dst = new byte[_hashedPassSize];
               Buffer.BlockCopy(salt, 0, dst, 1, 16);
               Buffer.BlockCopy(buffer, 0, dst, 17, 32);
               return Convert.ToBase64String(dst);
          }

          private bool VerifyPassword(string hashedPassword, string password)
          {

               if (string.IsNullOrEmpty(hashedPassword) || string.IsNullOrEmpty(password))
               {
                    return false;
               }
               byte[] src = Convert.FromBase64String(hashedPassword);
               if ((src.Length != _hashedPassSize) || (src[0] != 0))
               {
                    return false;
               }

               byte[] currentPasswordBuffer;
               byte[] salt = new byte[_saltSize];
               Buffer.BlockCopy(src, 1, salt, 0, _saltSize);
               byte[] hashedPasswordBuffer = new byte[32];
               Buffer.BlockCopy(src, 17, hashedPasswordBuffer, 0, 32);
               using (Rfc2898DeriveBytes bytes = new Rfc2898DeriveBytes(password, salt, _iterationsCount))
               {
                    currentPasswordBuffer = bytes.GetBytes(32);
               }
               return CompareArrays(hashedPasswordBuffer, currentPasswordBuffer);
          }

          private bool CompareArrays(byte[] arr1, byte[] arr2)
          {
               if (arr1.Length != arr2.Length)
               {
                    return false;
               }
               for (int i = 0; i < arr1.Length; i++)
               {
                    if (arr1[i] != arr2[i])
                    {
                         return false;
                    }
               }
               return true;
          }

     }
}
