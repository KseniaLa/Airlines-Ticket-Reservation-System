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
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore.Metadata.Conventions.Internal;
using Microsoft.Extensions.Caching.Memory;

namespace AirlinesApp.Services
{
     public class CityService : BaseService, ICityService, IScopedService
     {
          private IMemoryCache _cache;

          public CityService(IUnitOfWork unitOfWork, IMemoryCache memoryCache) : base(unitOfWork)
          {
                _cache = memoryCache;
          }

          public async Task AddCity(List<TranslationModel> translations)
          {
               if (translations.Count == 0)
               {
                    throw new LocationException("Translations should be provided");
               }
               List<string> cityNames = translations.Select(t => t.Value).ToList();

               List<Translation> testTranslations =
                    await Db.Translations.FindBy(t => cityNames.Contains(t.Value, StringComparer.InvariantCultureIgnoreCase)).ToListAsync();
               if (testTranslations.Count != 0)
               {
                    throw new LocationException("Location translation already exists");
               }

               City city = new City
               {
                    Rating = 0,
                    Url = "no",
                    Default = translations[0].Value
               };
               await Db.Cities.Add(city);
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
                         City = city,
                         Language = lang,
                         Value = translation.Value.ToLower(),
                    };
                    await Db.Translations.Add(transl);
               }

               await Db.Save();

          }

          public async Task<List<string>> GetCities(string language)
          {

               List<string> cityNames = await Db.Cities.GetAll()
                   .Select(c => c.Translations.FirstOrDefault(t => t.Language.Name == language).Value ?? c.Default).ToListAsync();
               return cityNames;

               // this works fine
               //List<Language> lang= await Db.Languages.GetAll().ToListAsync();
               //_cache.Set("lang", lang);
               //List<Language> l;
               //if (_cache.TryGetValue("lang", out l))
               //{
               //     // do
               //}

               //this fails
               //List<City> cities;
               //List<string> cityNames;
               //if (_cache.TryGetValue("cities", out cities))
               //{
               //     cityNames = cities.Select(c => c.Translations.FirstOrDefault(t => t.Language.Name == language)?.Value ?? c.Default).ToList();
               //     return cityNames;
               //}

               //cities = await Db.Cities.GetAll().ToListAsync();
               //_cache.Set("cities", cities);
               //cityNames = cities
               //   .Select(c => c.Translations.FirstOrDefault(t => t.Language.Name == language)?.Value ?? c.Default).ToList();
               //return cityNames;

          }

          public async Task<List<CityModel>> GetTopCities(int topCount, string language)
          {
               List<City> rawCities = await Db.Cities.GetAll()
                   .OrderByDescending(city => city.Rating)
                   .Take(topCount).ToListAsync();

               List<CityModel> cities = new List<CityModel>();
               foreach (City city in rawCities)
               {
                    cities.Add(new CityModel
                    {
                         Id = city.Id,
                         Url = city.Url,
                         Name = city.Translations.FirstOrDefault(t => t.Language.Name == language)?.Value ?? city.Default
                    });
               }
               return cities;
          }

          public async Task UpdateCityRating(string cityName)
          {
               City city = await Db.Cities.FindBy(c => c.Translations.Any(t => t.Value == cityName)).FirstOrDefaultAsync();
               if (city == null) return;
               city.Rating++;
               Db.Cities.Update(city);
               await Db.Save();
          }
     }
}
