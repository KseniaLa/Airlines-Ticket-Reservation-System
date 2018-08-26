using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;

namespace AirlinesApp.TokenManager
{
    public class TokenManager : ITokenManager
    {
         private readonly IMemoryCache _cache;
         private readonly IHttpContextAccessor _httpContextAccessor;

         public TokenManager(IMemoryCache cache,
              IHttpContextAccessor httpContextAccessor
         )
         {
              _cache = cache;
              _httpContextAccessor = httpContextAccessor;
         }

         public bool IsCurrentActiveToken()
              =>  IsActive(GetCurrentAsync());

         public void DeactivateCurrent()
              => Deactivate(GetCurrentAsync());

          public bool IsActive(string token)
          {
               string item;
               return !_cache.TryGetValue(GetKey(token), out item);
          }

         public void Deactivate(string token)
         {
              var cacheEntryOptions = new MemoryCacheEntryOptions()
                   .SetSlidingExpiration(TimeSpan.FromMinutes(JwtOptions.Lifetime));

              _cache.Set(GetKey(token), token, cacheEntryOptions);
          }
              

         private string GetCurrentAsync()
         {
              var authorizationHeader = _httpContextAccessor
                   .HttpContext.Request.Headers["authorization"];

              return authorizationHeader == StringValues.Empty
                   ? string.Empty
                   : authorizationHeader.Single().Split(" ").Last();
         }

         private static string GetKey(string token)
              => $"tokens:{token}:deactivated";
     }
}
