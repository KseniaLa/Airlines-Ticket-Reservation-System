using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace AirlinesApp.TokenManager
{
     public class TokenManagerMiddleware : IMiddleware
     {
          private readonly ITokenManager _tokenManager;

          public TokenManagerMiddleware(ITokenManager tokenManager)
          {
               _tokenManager = tokenManager;
          }

          public async Task InvokeAsync(HttpContext context, RequestDelegate next)
          {
               if (await _tokenManager.IsCurrentActiveToken())
               {
                    await next(context);

                    return;
               }
               context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
          }
     }
}
