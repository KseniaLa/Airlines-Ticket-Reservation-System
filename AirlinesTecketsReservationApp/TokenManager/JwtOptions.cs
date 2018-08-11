using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace TokenManager
{
     public class JwtOptions
     {
          public const string Issuer = "AirlinesServer";
          public const string Audience = "http://localhost:3000";
          public const int Lifetime = 1;
          private static readonly string _key = Convert.ToBase64String((new HMACSHA256()).Key);

          public static SymmetricSecurityKey GetSymmetricSecurityKey()
          {
               return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_key));
          }
     }
}
