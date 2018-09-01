using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AirlinesApp.DataAccess;
using AirlinesApp.DataAccess.Models.Entities;
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
                 l.Name.Equals(language.Substring(0, 2), StringComparison.InvariantCultureIgnoreCase)).FirstOrDefaultAsync();

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

        public async Task DeleteLanguage(string language)
        {
            Language lang = await Db.Languages.FindBy(l =>
                    l.Name.Equals(language.Substring(0, 2), StringComparison.InvariantCultureIgnoreCase))
                .FirstOrDefaultAsync();
            if (lang == null)
            {
                return;
            }

            List<Translation> transl = await Db.Translations.FindBy(t => t.Language.Id == lang.Id).ToListAsync();
            foreach (var t in transl)
            {
                Db.Translations.Delete(t.Id);
            }
            Db.Languages.Delete(lang.Id);
            await Db.Save();
        }
    }
}
