using System.Collections.Generic;
using System.Threading.Tasks;
using AirlinesApp.DataPresentation;
using AirlinesApp.Exceptions;
using AirlinesApp.Services;
using AirlinesApp.Services.Interfaces;
using AirlinesApp.TokenManager;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AirlinesTicketsReservationApp.Controllers
{
    [Route("api/companies")]
    public class CompaniesController : Controller
    {
        private readonly ICompanyService _companyService;

        public CompaniesController(ICompanyService companyService)
        {
            _companyService = companyService;
        }

        [Authorize(Roles = Roles.Administrator)]
        [HttpGet("{lang}")]
        public async Task<IActionResult> GetAllCompanies(string lang)
        {
            List<LocationModel> cities = await _companyService.GetCompaniesWithTranslations(lang);
            return Ok(new { companies = cities.ToArray() });
        }

        [Authorize(Roles = Roles.Administrator)]
        [HttpPut("add")]
        public async Task<IActionResult> AddCompany([FromBody] List<TranslationModel> companyTranslations)
        {
            await _companyService.AddCompany(companyTranslations);
            return Ok();
        }

        [Authorize(Roles = Roles.Administrator)]
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateCompany([FromBody] List<TranslationModel> companyTranslations, string id)
        {
            await _companyService.UpdateCompany(companyTranslations, int.Parse(id));
            return Ok();
        }
        
        [Authorize(Roles = Roles.Administrator)]
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCompany(string id)
        {
            await _companyService.DeleteCompany(int.Parse(id));
            return Ok();
        }
    }
}
