using System.Collections.Generic;
using System.Threading.Tasks;
using AirlinesApp.DataPresentation;

namespace AirlinesApp.Services.Interfaces
{
    public interface ICompanyService
    {
        Task AddCompany(List<TranslationModel> translations);

        Task UpdateCompany(List<TranslationModel> translations, int id);

        Task DeleteCompany(int id);

        Task<List<string>> GetCompanies(string language);

        Task<List<LocationModel>> GetCompaniesWithTranslations(string language);
    }
}
