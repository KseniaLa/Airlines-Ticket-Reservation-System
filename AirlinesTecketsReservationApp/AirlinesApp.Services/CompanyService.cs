using System;
using AirlinesApp.DataAccess.Models.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AirlinesApp.DataAccess;
using AirlinesApp.DataPresentation;
using AirlinesApp.Exceptions;
using AirlinesApp.Services.Interfaces;

namespace AirlinesApp.Services
{
    public class CompanyService : BaseService, ICompanyService, IScopedService
    {
        public CompanyService(IUnitOfWork unitOfWork) : base(unitOfWork)
        {

        }

        public async Task AddCompany(List<TranslationModel> translations)
        {
             if (translations.Count == 0)
             {
                  throw new LocationException("Translations should be provided");
             }
               List<string> companyNames = translations.Select(t => t.Value).ToList();

            List<Translation> testTranslations =
                 await Db.Translations.FindBy(t => companyNames.Contains(t.Value, StringComparer.InvariantCultureIgnoreCase)).ToListAsync();
            if (testTranslations.Count != 0)
            {
                throw new LocationException("Location translation already exists");
            }

            Company company = new Company
            {
                Stars = 0,
                 Default = translations[0].Value
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

        public async Task UpdateCompany(List<TranslationModel> translations, int id)
        {
            Company company = await Db.Companies.FindBy(c => c.Id == id).FirstOrDefaultAsync();
            if (company == null || translations == null || translations.Count == 0)
            {
                throw new LocationException();
            }

            List<Translation> transl = company.Translations.ToList();
            foreach (var t in transl)
            {
                Db.Translations.Delete(t.Id);
            }
            translations = translations.Distinct().ToList();

            foreach (TranslationModel translation in translations)
            {
                Language lang = await Db.Languages.FindBy(l => l.Name == translation.Language)
                    .FirstOrDefaultAsync();
                if (lang == null)
                {
                    throw new LanguageException("No such language");
                }

                Translation t = new Translation
                {
                    Company = company,
                    Language = lang,
                    Value = translation.Value.ToLower(),
                };
                await Db.Translations.Add(t);
            }

            await Db.Save();
        }


        public async Task DeleteCompany(int id)
        {
            List<Ticket> tickets =
                 await Db.Tickets.FindBy(t => t.CompanyId == id).ToListAsync();
            foreach (var ticket in tickets)
            {
                Db.Tickets.Delete(ticket.Id);
            }
            List<Translation> translations =
                 await Db.Translations.FindBy(t => t.Company.Id == id).ToListAsync();
            foreach (var translation in translations)
            {
                Db.Translations.Delete(translation.Id);
            }
            await Db.Save();
            Db.Companies.Delete(id);
            await Db.Save();
        }

        public async Task<List<string>> GetCompanies(string language)
        {
            List<string> companyNames = await Db.Companies.GetAll()
                .Select(c => c.Translations.FirstOrDefault(t => t.Language.Name == language).Value ?? c.Default).ToListAsync();
            return companyNames;
        }

        public async Task<List<LocationModel>> GetCompaniesWithTranslations(string language)
        {
            List<Company> companies = await Db.Companies.GetAll().ToListAsync();
            List<LocationModel> result = new List<LocationModel>();
            foreach (var company in companies)
            {
                List<TranslationModel> translations = new List<TranslationModel>();
                foreach (var translation in company.Translations.ToList())
                {
                    translations.Add(new TranslationModel
                    {
                        Language = translation.Language.Name,
                        Value = translation.Value
                    });
                }
                result.Add(new LocationModel
                {
                    Id = company.Id,
                    Name = company.Translations.FirstOrDefault(t => t.Language.Name == language)?.Value ?? company.Default,
                    Translations = translations
                });
            }

            return result;
        }
    }
}
