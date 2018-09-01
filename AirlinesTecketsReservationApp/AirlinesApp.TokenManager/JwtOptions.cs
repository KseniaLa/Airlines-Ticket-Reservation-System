using AirlinesApp.Config;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Security.Cryptography;
using System.Text;

namespace AirlinesApp.TokenManager
{
    public static class JwtOptions
    {
        private static readonly IConfig Configuration = new Config.Config();
        public static readonly string Issuer = Configuration.ServerName;
        public static readonly string Audience = Configuration.Audience;
        public static readonly int Lifetime = Configuration.Lifetime;
        private static readonly string Key = Convert.ToBase64String((new HMACSHA256()).Key);

        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Key));
        }
    }
}
