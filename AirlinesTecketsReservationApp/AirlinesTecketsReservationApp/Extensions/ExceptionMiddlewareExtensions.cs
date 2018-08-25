using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AirlinesApp.DataAccess.Models.SupportingModels;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;

namespace AirlinesTicketsReservationApp.Extensions
{
     public static class ExceptionMiddlewareExtensions
     {
          public static void ConfigureExceptionMiddleware(this IApplicationBuilder app)
          {
               app.UseMiddleware<ExceptionMiddleware.ExceptionMiddleware>();
          }
     }
}
