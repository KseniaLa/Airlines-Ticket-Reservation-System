using AirlinesApp.DataAccess.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Security.Cryptography;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using AirlinesApp.DataAccess;
using AirlinesApp.Services.Interfaces;
using AirlinesApp.DataPresentation;
using AutoMapper;
using AirlinesApp.Config;

namespace AirlinesApp.Services
{
    public class AccountService : BaseService, IAccountService, IScopedService
    {
        private readonly int _iterationsCount;
        private readonly int _saltSize;
        private readonly int _hashedPassSize;
        private readonly IMapper _mapper;
        private readonly IEncryptionService _encryptionService;
        private readonly IEmailService _emailService;
        private readonly IConfig _config;

        public AccountService(IUnitOfWork unitOfWork, IMapper mapper,
                              IConfig config, IEncryptionService encryptor,
                              IEmailService emailService) : base(unitOfWork)
        {
            _saltSize = config.SaltSize;
            _iterationsCount = config.IterationsCount;
            _hashedPassSize = config.HashedPassSize;
            _config = config;
            _mapper = mapper;
            _encryptionService = encryptor;
            _emailService = emailService;
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
                if (user == null || !user.Confirmed) return null;
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
                user.Token = _encryptionService.Encrypt(user.Email);
                user.Confirmed = false;

                await Db.Users.Add(user);
                await Db.Save();

                await SendConfirmationEmail(user.Email, user.Token);

                return user;
            }

            return null;
        }

        public async Task<User> ConfirmEmail(string token)
        {
            User user = await Db.Users.FindBy(u => u.Token == token).FirstOrDefaultAsync();
            if (user == null) return null;
            string email = _encryptionService.Decrypt(token);
            if (user.Email == email)
            {
                user.Confirmed = true;
                Db.Users.Update(user);
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

        private async Task SendConfirmationEmail(string email, string token)
        {
            string subject = "Confirm your email";
            string link = _config.ConfirmationLink + token;
            string message = $"Please confirm your account by <a href='{HtmlEncoder.Default.Encode(link)}'>clicking here</a>.";
            await _emailService.SendEmail(email, subject, message);
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
