﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Net.Mail;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AirlinesApp.Services;
using AirlinesApp.DataAccess.Models.Entities;
using AirlinesApp.DataAccess.Models.SupportingModels;
using AirlinesApp.TokenManager;

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

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Authenticate([FromBody]LoginModel user)
        {
            User usr = await _accountService.TryAuthenticate(user.Email, user.Password);
            if (usr != null)
            {
                string token = _jwtGenerator.GenerateToken(usr);
                return Ok(new { token, name = usr.Name, surname = usr.Surname, isAdmin = usr.IsAdmin });
            }
            return BadRequest();
        }

        [AllowAnonymous]
        [HttpPost("signup")]
        public async Task<IActionResult> Register([FromBody]SignupModel user)
        {
            try
            {
                // replace with MailKit / sendgrid?
                EmailService.SendTestEmail(user.Email); //not working
            }
            catch (SmtpFailedRecipientsException)
            {
                return BadRequest();
            }
            User usr = await _accountService.SignUp(user);
            if (usr != null)
            {
                return Ok();
            }
            return BadRequest();
        }
    }
}
