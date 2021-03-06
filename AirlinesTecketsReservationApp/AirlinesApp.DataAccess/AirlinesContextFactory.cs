﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;

namespace AirlinesApp.DataAccess
{
    public class AirlinesContextFactory : IDesignTimeDbContextFactory<AirlinesContext>
    {
        public AirlinesContext CreateDbContext(string[] args)
        {
            var environmentName = Environment.GetEnvironmentVariable("Hosting:Environment");
            var basePath = AppContext.BaseDirectory;
            return Create(basePath, environmentName);
        }

        private AirlinesContext Create(string basePath, string environmentName)
        {
            var builder = Config.Config.GetBuilder(basePath);

            var config = builder.Build();
            var connectionString = config.GetConnectionString("DefaultConnection");

            if (string.IsNullOrWhiteSpace(connectionString))
            {
                throw new InvalidOperationException(
                    "Could not find a connection string named '(DefaultConnection)'.");
            }

            return Create(connectionString);
        }

        private AirlinesContext Create(string connectionString)
        {
            if (string.IsNullOrEmpty(connectionString))
                throw new ArgumentException(
                    $"{nameof(connectionString)} is null or empty.",
                    nameof(connectionString));

            var optionsBuilder = new DbContextOptionsBuilder();
            optionsBuilder.UseSqlServer(connectionString);
            return new AirlinesContext(optionsBuilder.Options, new Config.Config());
        }

    }
}
