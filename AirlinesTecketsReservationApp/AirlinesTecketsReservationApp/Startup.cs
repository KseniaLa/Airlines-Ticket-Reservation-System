﻿using System;
using System.Collections.Generic;
using AirlinesApp.Config;
using AirlinesApp.DataAccess;
using AirlinesApp.DataAccess.Repositories;
using AirlinesApp.Services;
using AirlinesApp.Services.Interfaces;
using AirlinesApp.TokenManager;
using AirlinesTicketsReservationApp.Extensions;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;

namespace AirlinesTicketsReservationApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                 .AddJwtBearer(options =>
                 {
                     options.RequireHttpsMetadata = false;
                     options.TokenValidationParameters = new TokenValidationParameters
                     {
                         ValidateIssuer = true,
                         ValidIssuer = JwtOptions.Issuer,
                         ValidateAudience = true,
                         ValidAudience = JwtOptions.Audience,
                         ValidateLifetime = true,
                         IssuerSigningKey = JwtOptions.GetSymmetricSecurityKey(),
                         ValidateIssuerSigningKey = true,
                     };
                 });

            services.AddTransient<IConfig, Config>();
            services.AddTransient<IAirlinesContext, AirlinesContext>();
            services.AddDbContext<AirlinesContext>(options =>
                 options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")), ServiceLifetime.Singleton);
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddTransient(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddTransient<IUnitOfWork, AirlinesUnitOfWork>();

            services.Scan(scan => scan
                 .FromAssembliesOf(new List<Type> { typeof(IAccountService), typeof(AccountService) })
                 .AddClasses(classes => classes.AssignableTo<IScopedService>())
                 .AsImplementedInterfaces()
                 .WithScopedLifetime()
            );



            services.AddSingleton<IHostedService, NotificationsService>();

            services.AddAutoMapper();
            services.AddMemoryCache();

            services.AddTransient<TokenManagerMiddleware>();
            services.AddTransient<ITokenManager, TokenManager>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddDistributedRedisCache(r => { r.Configuration = Configuration["redis:connectionString"]; });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(
               options => options.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyOrigin().AllowAnyHeader()
            );

            app.UseAuthentication();

            app.UseMiddleware<TokenManagerMiddleware>();

            app.ConfigureExceptionMiddleware();

            app.UseMvc();
        }
    }
}
