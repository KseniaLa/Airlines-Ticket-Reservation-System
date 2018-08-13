using Microsoft.IdentityModel.Tokens;
using Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace TokenManager
{
     public class JwtGenerator
     {
          public JwtGenerator ()
          {

          }

          private IEnumerable<Claim> CreateClaims(User user)
          {
               return new Claim[]
               {
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, user.IsAdmin ? Roles.Administrator : Roles.User)
               };
          }

          public string GenerateToken(User user)
          {
               var currentTime = DateTime.UtcNow;

               var jwt = new JwtSecurityToken(
                    issuer: JwtOptions.Issuer,
                    audience: JwtOptions.Audience,
                    notBefore: currentTime,
                    claims: CreateClaims(user),
                    expires: currentTime.Add(TimeSpan.FromMinutes(JwtOptions.Lifetime)),
                    signingCredentials: new SigningCredentials(JwtOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));

               var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

               return encodedJwt;
          }
     }
}
