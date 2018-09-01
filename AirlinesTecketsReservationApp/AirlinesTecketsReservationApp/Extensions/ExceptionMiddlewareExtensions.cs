using Microsoft.AspNetCore.Builder;

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
