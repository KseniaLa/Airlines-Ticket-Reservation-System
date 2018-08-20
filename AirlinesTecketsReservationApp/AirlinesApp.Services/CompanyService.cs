using AirlinesApp.DataAccess.Models.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AirlinesApp.DataAccess.Models.SupportingModels;
using AirlinesApp.Exceptions;
using AirlinesApp.Services.Interfaces;

namespace AirlinesApp.Services
{
    public class CompanyService : BaseService, ICompanyService
    {
        public async Task AddCompany(List<TranslationModel> translations)
        {

            List<string> companyNames = new List<string>();
            foreach (TranslationModel t in translations)
            {
                companyNames.Add(t.Value.ToLower());
            }

            List<Translation> testTranslations =
                 await Db.Translations.FindBy(t => companyNames.Contains(t.Value.ToLower())).ToListAsync();
            if (testTranslations.Count != 0)
            {
                throw new LocationException("Location translation already exists");
            }

            Company company = new Company
            {
                Stars = 0,
            };
            await Db.Companies.Add(company);
            foreach (TranslationModel translation in translations)
            {
                Language lang = await Db.Languages.FindBy(l => l.Name == translation.Language)
                     .FirstOrDefaultAsync();
                if (lang == null)
                {
                    throw new LanguageException("No such language");
                }

                Translation transl = new Translation
                {
                    Company = company,
                    Language = lang,
                    Value = translation.Value.ToLower(),
                };
                await Db.Translations.Add(transl);
            }

            await Db.Save();

        }

        public async Task<List<string>> GetCompanies(string language)
        {
            List<Company> companies = await Db.Companies.GetAll().ToListAsync();
            List<string> companyNames = new List<string>();
            foreach (Company company in companies)
            {
                companyNames.Add(company.Translations.FirstOrDefault(t => t.Language.Name == language)?.Value);
            }
            return companyNames;
        }
    }
}
