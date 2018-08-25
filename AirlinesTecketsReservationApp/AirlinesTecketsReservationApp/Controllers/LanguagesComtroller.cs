using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AirlinesApp.Services.Interfaces;
using AirlinesApp.TokenManager;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp;

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
     }
}
