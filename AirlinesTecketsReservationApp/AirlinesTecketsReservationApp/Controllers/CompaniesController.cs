using System.Collections.Generic;
using System.Threading.Tasks;
using AirlinesApp.DataAccess.Models.SupportingModels;
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

        [Authorize(Roles = Roles.Administrator)]
        [HttpPut("add")]
        public async Task<IActionResult> AddCompany([FromBody] string company)
        {
            try
            {
                List<TranslationModel> companyTranslations = JsonConvert.DeserializeObject<List<TranslationModel>>(company);
                await _companyService.AddCompany(companyTranslations);
                return Ok();
            }
            catch (LocationException)
            {
                return BadRequest();
            }
            catch (LanguageException)
            {
                return BadRequest();
            }
            catch
            {
                return BadRequest();
            }

        }
    }
}
