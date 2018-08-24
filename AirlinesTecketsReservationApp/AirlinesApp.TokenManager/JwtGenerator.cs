﻿using AirlinesApp.DataAccess.Models.Entities;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace AirlinesApp.TokenManager
{
    public static class JwtGenerator
    {
        private static IEnumerable<Claim> CreateClaims(User user)
        {
            return new[]
            {
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, user.IsAdmin ? Roles.Administrator : Roles.User)
            };
        }

        public static string GenerateToken(User user)
        {
            var currentTime = DateTime.UtcNow;

            var jwt = new JwtSecurityToken(
                 JwtOptions.Issuer,
                 JwtOptions.Audience,
                 notBefore: currentTime,
                 claims: CreateClaims(user),
                 expires: currentTime.Add(TimeSpan.FromMinutes(JwtOptions.Lifetime)),
                 signingCredentials: new SigningCredentials(JwtOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return encodedJwt;
        }
    }
}
