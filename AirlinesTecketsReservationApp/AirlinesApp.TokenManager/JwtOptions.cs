﻿using AirlinesApp.DataAccess;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace AirlinesApp.TokenManager
{
     public static class JwtOptions
     {
          //private static readonly IConfiguration Configuration = new ConfigurationBuilder()
          //                                              .SetBasePath(Directory.GetCurrentDirectory())
          //                                              .AddJsonFile("appsettings.json").Build();
          private static readonly IConfiguration Configuration = ConfigBuilder.GetConfigRoot(Directory.GetCurrentDirectory());
          public static readonly string Issuer = Configuration["ServerName"];
          public static readonly string Audience = Configuration["Audience"];
          public static readonly int Lifetime = int.Parse(Configuration["JWTLifetime"]);
          private static readonly string Key = Convert.ToBase64String((new HMACSHA256()).Key);

          public static SymmetricSecurityKey GetSymmetricSecurityKey()
          {
               return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Key));
          }
     }
}
