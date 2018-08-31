using System.Collections.Generic;
using System.Threading.Tasks;
using AirlinesApp.Services.Interfaces;
using AirlinesApp.TokenManager;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AirlinesTicketsReservationApp.Controllers
{
     [Route("api/languages")]
     public class LanguagesComtroller : Controller
     {
          private readonly ILanguageService _languageService;

          public LanguagesComtroller(ILanguageService languageService)
          {
               _languageService = languageService;
          }

          [Authorize(Roles = Roles.Administrator)]
          [HttpGet]
          public async Task<IActionResult> GetLanguages()
          {
               List<string> languages = await _languageService.GetLanguages();
               return Ok(new { languages });
          }

          [Authorize(Roles = Roles.Administrator)]
          [HttpPut("add")]
          public async Task<IActionResult> AddLanguage([FromBody]string language)
          {
               await _languageService.AddLanguage(language);
               return Ok();
          }

         [Authorize(Roles = Roles.Administrator)]
         [HttpDelete("delete/{lang}")]
         public async Task<IActionResult> DeleteLanguage(string lang)
         {
             await _languageService.DeleteLanguage(lang);
             return Ok();
         }
    }
}
