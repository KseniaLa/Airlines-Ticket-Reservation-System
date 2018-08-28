using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AirlinesApp.DataPresentation;

namespace AirlinesApp.Services.Interfaces
{
    public interface ICityService
    {
        Task AddCity(List<TranslationModel> translations);

        Task UpdateCity(List<TranslationModel> translations, int id);

        Task DeleteCity(int id);

        Task<List<CityTranslationModel>> GetCitiesWithTranslations(string language);

        Task<List<string>> GetCities(string language);

        Task<List<CityModel>> GetTopCities(int topCount, string language);

        Task UpdateCityRating(string cityName);

        Task<List<CityModel>> GetAllCities(string language);
    }
}
