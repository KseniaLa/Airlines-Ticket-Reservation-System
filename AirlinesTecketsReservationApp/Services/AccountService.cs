using AirlinesTicketsReservationApp.Repositories;
using Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class AccountService
    {
          private UserRepository _db;
          private const int _iterationsCount = 10000;
          private const int _saltSize = 16;
          private const int _hashedPassSize = 49;

          public AccountService()
          {
               _db = new UserRepository();
          }

          // should be async?
          public User TryAuthenticate(string email, string password)
          {
               try
               {
                    if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
                    {
                         return null;
                    }
                    else
                    {
                         User user = _db.GetUserByEmail(email); // make await
                         if (user != null)
                         {
                              if (VerifyPassword(password, password)) // replace with user.PasswordHash !
                              {
                                   return user;
                              }
                         }
                         return null;
                    }
               }
               catch (Exception e)
               {
                    return null;
               }
          }

          public User SignUp(UserInfo registrationInfo)
          {
               if (string.IsNullOrEmpty(registrationInfo.Name) || string.IsNullOrEmpty(registrationInfo.Surname)
                    || string.IsNullOrEmpty(registrationInfo.Email) || string.IsNullOrEmpty(registrationInfo.Password))
               {
                    return null;
               }
               else
               {
                    User searchUser = _db.GetUserByEmail(registrationInfo.Email);
                    bool userExists = !(searchUser == null);
                    if (!userExists)
                    {
                         User user = new User
                         {
                              Name = registrationInfo.Name,
                              Surname = registrationInfo.Surname,
                              Email = registrationInfo.Email,
                              //PasswordHash = HashPassword(registrationInfo.Password);
                              // add password hash
                         };

                         _db.Add(user);
                         _db.Save();

                         return user;
                    }
                    else
                    {
                         return null;
                    }
               }
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