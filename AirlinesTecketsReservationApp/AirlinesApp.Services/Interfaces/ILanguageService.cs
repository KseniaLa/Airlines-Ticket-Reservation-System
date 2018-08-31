using System.Collections.Generic;
using System.Threading.Tasks;

namespace AirlinesApp.Services.Interfaces
{
    public interface ILanguageService
    {
        Task<List<string>> GetLanguages();
        Task AddLanguage(string language);
        Task DeleteLanguage(string language);
    }
}
