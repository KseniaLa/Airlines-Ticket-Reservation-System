using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AirlinesApp.DataPresentation;

namespace AirlinesApp.Services.Interfaces
{
    public interface ICompanyService
    {
        Task AddCompany(List<TranslationModel> translations);

        Task<List<string>> GetCompanies(string language);
    }
}
