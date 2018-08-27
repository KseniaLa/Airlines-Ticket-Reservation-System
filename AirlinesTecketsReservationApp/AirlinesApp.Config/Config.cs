using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace AirlinesApp.Config
{
    public class Config : IConfig
    {
        private readonly IConfigurationRoot _configuration;

        public static IConfigurationBuilder GetBuilder(string path)
        {
            return new ConfigurationBuilder()
                .SetBasePath(path)
                .AddJsonFile("appsettings.json");
        }

        private IConfigurationRoot GetConfigRoot(string path)
        {
            return new ConfigurationBuilder()
                .SetBasePath(path)
                .AddJsonFile("appsettings.json").Build();
        }

        public Config()
        {
            _configuration = GetConfigRoot(Directory.GetCurrentDirectory());
        }

        public int SaltSize => int.Parse(_configuration["PasswordHashing:SaltSize"]);
        public int IterationsCount => int.Parse(_configuration["PasswordHashing:IterationsCount"]);
        public int HashedPassSize => int.Parse(_configuration["PasswordHashing:HashedPasswordSize"]);
        public string ServerName => _configuration["ServerName"];
        public string Audience => _configuration["Audience"];
        public int Lifetime => int.Parse(_configuration["JWTLifetime"]);
        public string ConnectionString => _configuration["ConnectionStrings:DefaultConnection"];
    }
}
