using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AirlinesApp.Services;
using AirlinesApp.TokenManager;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AirlinesTicketsReservationApp.Controllers
{
     [Route("api/companies")]
     public class CompaniesController : Controller
     {
          private readonly CompanyService _companyService;

          public CompaniesController()
          {
               _companyService = new CompanyService();
          }

          [Authorize(Roles = Roles.Administrator)]
          [HttpGet("{lang}")]
          public async Task<IActionResult> GetAllCompanies(string lang)
          {
               try
               {
                    List<string> companies = await _companyService.GetCompanies(lang);
                    return Ok(new { companies = companies.ToArray() });
               }
               catch
               {
                    return BadRequest();
               }

          }
     }
}
