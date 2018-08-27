using AirlinesApp.Config;
using AirlinesApp.DataAccess.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace AirlinesApp.DataAccess
{
    public class AirlinesContext : DbContext, IAirlinesContext
    {
        private readonly IConfig _config;

        public AirlinesContext()
        {
        }

        public AirlinesContext(DbContextOptions options, IConfig config) : base(options)
        {
            _config = config;
        }

        public DbSet<City> Cities { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Flight> Flights { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<Translation> Translations { get; set; }
        public DbSet<IpAddress> IpAddresses { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //if (optionsBuilder.IsConfigured) return;
            //IConfigurationRoot configuration = new ConfigurationBuilder()
            //    .SetBasePath(Directory.GetCurrentDirectory())
            //    .AddJsonFile("appsettings.json")
            //    .Build();
            //IConfigurationRoot configuration = ConfigBuilder.GetConfigRoot(Directory.GetCurrentDirectory());
            //var connectionString = configuration.GetConnectionString("DefaultConnection");
            var connectionString = _config.ConnectionString;
            optionsBuilder.UseSqlServer(connectionString).UseLazyLoadingProxies();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Flight>()
                .HasIndex(f => new { f.DepartureId, f.DestinationId, f.DateTime }).IsUnique();

            modelBuilder.Entity<Ticket>()
                .HasIndex(t => new { t.FlightId, t.CompanyId, t.Category }).IsUnique();

            // admin password: 12345678
            modelBuilder.Entity<User>().HasData(new User
            {
                Id = 1,
                Name = "airlines",
                Surname = "airlines",
                Email = "airlines@ks.la",
                PasswordHash = "ACmEat7zjCDM//KDXxqQugFlUr4TEx82LLtkRch3a9uJGvsB+WRHAs8jqIawzrxwSg==",
                IsAdmin = true
            });

            modelBuilder.Entity<Language>().HasData(new Language { Id = 1, Name = "ru" }, new Language { Id = 2, Name = "en" });
        }
    }
}
