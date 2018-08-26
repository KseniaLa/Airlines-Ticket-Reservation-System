using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AirlinesApp.DataPresentation;
using AirlinesApp.Exceptions;
using Microsoft.AspNetCore.Http;

namespace AirlinesTicketsReservationApp.ExceptionMiddleware
{
     public class ExceptionMiddleware
     {
          private readonly RequestDelegate _next;
          //private readonly ILoggerManager _logger;

          public ExceptionMiddleware(RequestDelegate next)
          {
               //_logger = logger;
               _next = next;
          }

          public async Task InvokeAsync(HttpContext httpContext)
          {
               try
               {
                    await _next(httpContext);
               }
               catch (LocationException ex)
               {
                    await HandleExceptionAsync(httpContext, ex, HttpStatusCode.BadRequest);
               }
               catch (LanguageException ex)
               {
                    await HandleExceptionAsync(httpContext, ex, HttpStatusCode.BadRequest);
               }
               catch (BookingException ex)
               {
                    await HandleExceptionAsync(httpContext, ex, HttpStatusCode.BadRequest);
               }
               catch (EmailException ex)
               {
                    await HandleExceptionAsync(httpContext, ex, HttpStatusCode.BadRequest);
               }
               catch (Exception ex)
               {
                    //_logger.LogError($"Something went wrong: {ex}");
                    await HandleExceptionAsync(httpContext, ex, HttpStatusCode.InternalServerError);
               }
          }

          private static Task HandleExceptionAsync(HttpContext context, Exception exception, HttpStatusCode code)
          {
               context.Response.ContentType = "application/json";
               context.Response.StatusCode = (int)code;

               return context.Response.WriteAsync(new ErrorDetails()
               {
                    StatusCode = context.Response.StatusCode,
                    Message = exception.Message,
               }.ToString());
          }
     }
}
