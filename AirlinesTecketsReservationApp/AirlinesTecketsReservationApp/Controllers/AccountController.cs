using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AirlinesTicketsReservationApp.Models.Models;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AirlinesTicketsReservationApp.Controllers
{
     [Route("api/account")]
     public class AccountController : Controller
     {
          private readonly AccountService _accountService;

          public AccountController()
          {
               _accountService = new AccountService();
          }

          // GET: api/account
          [HttpGet]
          public IEnumerable<string> Get()
          {
               return new string[] { "user" };
          }

          // GET api/<controller>/5
          [HttpGet("{id}")]
          public string Get(int id)
          {
               return "value";
          }

          // POST api/<controller>
          [HttpPost]
          public IActionResult Post([FromBody]LoginDataModel user)
          {
               User usr = _accountService.TryAuthenticate(user.Email, user.Password);
               if (usr != null)
               {
                    return Ok();
               }
               return BadRequest();
          }

          // PUT api/<controller>/5
          [HttpPut("{id}")]
          public void Put(int id, [FromBody]string value)
          {
          }

          // DELETE api/<controller>/5
          [HttpDelete("{id}")]
          public void Delete(int id)
          {
          }
     }
}
