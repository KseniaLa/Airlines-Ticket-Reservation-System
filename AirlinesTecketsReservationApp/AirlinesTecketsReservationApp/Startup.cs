﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AirlinesTicketsReservationApp.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Models;

namespace AirlinesTecketsReservationApp
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

               /*services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
              .AddJwtBearer(jwtBearerOptions =>
              {
                   jwtBearerOptions.TokenValidationParameters = new TokenValidationParameters()
                   {
                        ValidateActor = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = Configuration["Issuer"],
                        ValidAudience = Configuration["Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["SigningKey"]))
                   };
              });*/

               services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
               services.AddTransient<IAirlinesContext, AirlinesContext>();
               services.AddDbContext<AirlinesContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
          }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(
               options => options.WithOrigins("http://localhost:3000").AllowAnyMethod()
            );

            //app.UseAuthentication();

            app.UseMvc();
        }
    }
}
