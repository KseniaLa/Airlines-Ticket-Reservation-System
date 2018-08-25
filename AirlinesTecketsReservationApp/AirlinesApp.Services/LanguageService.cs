using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AirlinesApp.DataAccess;
using AirlinesApp.DataAccess.Models.Entities;
using AirlinesApp.DataAccess.Models.SupportingModels;
using AirlinesApp.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AirlinesApp.Services
{
    public class LanguageService : BaseService, ILanguageService, IScopedService
    {
        public LanguageService(IUnitOfWork unitOfWork) : base(unitOfWork)
        {

        }

        public async Task<List<string>> GetLanguages()
        {
            List<Language> languages = await Db.Languages.GetAll().ToListAsync();
            return languages.Select(l => l.Name).ToList();
        }

         public async Task AddLanguage(string language)
         {
              Language testLanguage = await Db.Languages.FindBy(l =>
                   l.Name.Equals(language, StringComparison.InvariantCultureIgnoreCase)).FirstOrDefaultAsync();

              if (testLanguage != null)
              {
                   return;
              }

              Language lang = new Language
              {
                   Name = language.Substring(0, 2).ToLower()
              };
              await Db.Languages.Add(lang);
              await Db.Save();
         }
     }
}
