using AirlinesApp.DataAccess.Models.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirlinesApp.Services
{
    public class CompanyService : BaseService
    {
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
