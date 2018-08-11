using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AirlinesTicketsReservationApp.Models.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;
using TokenManager;

namespace AirlinesTicketsReservationApp.Controllers
{
     [Route("api/account")]
     public class AccountController : Controller
     {
          private readonly AccountService _accountService;
          private readonly JwtGenerator _jwtGenerator;

          public AccountController()
          {
               _accountService = new AccountService();
               _jwtGenerator = new JwtGenerator();
          }


          // GET api/<controller>/5
          [HttpGet("{id}")]
          public string Get(int id)
          {
               return "value";
          }

          [AllowAnonymous]
          [HttpPost("login")]
          public async Task<IActionResult> Authenticate([FromBody]LoginDataModel user)
          {
               User usr = await _accountService.TryAuthenticate(user.Email, user.Password);
               if (usr != null)
               {
                    string token = _jwtGenerator.GenerateToken(usr);
                    return Ok(new { token });
               }
               return BadRequest();
          }

          [AllowAnonymous]
          [HttpPost("signup")]
          public async Task<IActionResult> Register([FromBody]SignUpModel user)
          {
               //EmailService.SendTestEmail(user.Email);
               User usr = await _accountService.SignUp(user);
               if (usr != null)
               {
                    return Ok();
               }
               return BadRequest();
          }
     }
}
