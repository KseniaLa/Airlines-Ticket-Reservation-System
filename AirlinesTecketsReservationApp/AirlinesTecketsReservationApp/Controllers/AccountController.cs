using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Net.Mail;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AirlinesApp.Services;
using AirlinesApp.DataAccess.Models.Entities;
using AirlinesApp.Services.Interfaces;
using AirlinesApp.TokenManager;
using Microsoft.AspNetCore.Http;
using AirlinesApp.DataPresentation;
using AirlinesApp.Exceptions;
using AutoMapper;

namespace AirlinesTicketsReservationApp.Controllers
{
     [Route("api/account")]
     public class AccountController : Controller
     {
          private readonly IAccountService _accountService;
          private readonly IIpService _ipService;
          private readonly IHttpContextAccessor _accessor;
          private readonly ITokenManager _tokenManager;

          public AccountController(IHttpContextAccessor accessor, IAccountService accountService, IIpService ipService, ITokenManager tokenManager)
          {
               _accountService = accountService;
               _ipService = ipService;
               _accessor = accessor;
               _tokenManager = tokenManager;
          }

          [AllowAnonymous]
          [HttpPost("login")]
          public async Task<IActionResult> Authenticate([FromBody]LoginModel user)
          {
               User usr = await _accountService.TryAuthenticate(user.Email, user.Password);
               if (usr != null)
               {
                    var ip = _accessor.HttpContext.Connection.RemoteIpAddress.ToString();
                    await _ipService.AddUserIpAddress(usr.Id, ip);
                    string token = JwtGenerator.GenerateToken(usr);
                    return Ok(new { token, name = usr.Name, surname = usr.Surname, isAdmin = usr.IsAdmin });
               }
               return BadRequest();
          }

          [Authorize]
          [HttpPost("update")]
          public async Task<IActionResult> UpdateUser()
          {
               if (!await _tokenManager.IsCurrentActiveToken())
               {
                    throw new UnauthorizedException();
               }
               string email = HttpContext.User.FindFirst(ClaimTypes.Email).Value;
               User usr = await _accountService.GetUserByEmail(email);
               if (usr != null)
               {
                    string token = JwtGenerator.GenerateToken(usr);
                    return Ok(new { token, name = usr.Name, surname = usr.Surname, isAdmin = usr.IsAdmin });
               }
               return BadRequest();
          }

          [AllowAnonymous]
          [HttpPost("signup")]
          public async Task<IActionResult> Register([FromBody]SignupModel user)
          {
               await EmailService.SendTestEmail(user.Email);
               User usr = await _accountService.SignUp(user);
               if (usr != null)
               {
                    return Ok();
               }
               return BadRequest();
          }

          [Authorize]
          [HttpGet("iphistory")]
          public async Task<IActionResult> GetUserIpHistory()
          {
               string email = HttpContext.User.FindFirst(ClaimTypes.Email).Value;
               User user = await _accountService.GetUserByEmail(email);
               List<IpAddressModel> addresses = await _ipService.GetUserIpAddressLatest(user.Id, 10);
               return Ok(new { addresses });
          }

          
          [HttpPost("tokens/cancel")]
          public async Task<IActionResult> CancelAccessToken()
          {
               await _tokenManager.DeactivateCurrentAsync();

               return NoContent();
          }
     }
}
