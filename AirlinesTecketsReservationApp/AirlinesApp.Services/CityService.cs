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

        public async Task UpdateCity(List<TranslationModel> translations, int id)
        {
            City city = await Db.Cities.FindBy(c => c.Id == id).FirstOrDefaultAsync();
            if (city == null || translations == null || translations.Count == 0)
            {
                throw new LocationException();
            }

            List<Translation> transl = city.Translations.ToList();
            foreach (var t in transl)
            {
                Db.Translations.Delete(t.Id);
            }
            translations = translations.Distinct().ToList();

            // set default!!!!!!!!!!!!!!!

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
                    City = city,
                    Language = lang,
                    Value = translation.Value.ToLower(),
                };
                await Db.Translations.Add(t);
            }

            await Db.Save();
        }


        public async Task DeleteCity(int id)
        {
            List<Flight> flights =
                 await Db.Flights.FindBy(f => f.DepartureId == id || f.DestinationId == id).ToListAsync();
            foreach (var flight in flights)
            {
                Db.Flights.Delete(flight.Id);
            }
            List<Translation> translations =
                 await Db.Translations.FindBy(t => t.City.Id == id).ToListAsync();
            foreach (var translation in translations)
            {
                Db.Translations.Delete(translation.Id);
            }
            await Db.Save();
            Db.Cities.Delete(id);
            await Db.Save();
        }

        public async Task<List<CityTranslationModel>> GetCitiesWithTranslations(string language)
        {
            List<City> cities = await Db.Cities.GetAll().ToListAsync();
            List<CityTranslationModel> result = new List<CityTranslationModel>();
            foreach (var city in cities)
            {
                List<TranslationModel> translations = new List<TranslationModel>();
                foreach (var translation in city.Translations.ToList())
                {
                    translations.Add(new TranslationModel
                    {
                        Language = translation.Language.Name,
                        Value = translation.Value
                    });
                }
                result.Add(new CityTranslationModel
                {
                    Id = city.Id,
                    Name = city.Translations.FirstOrDefault(t => t.Language.Name == language)?.Value ?? city.Default,
                    Translations = translations
                });
            }

            return result;
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

        public async Task<List<CityModel>> GetAllCities(string language)
        {
            List<City> rawCities = await Db.Cities.GetAll().ToListAsync();

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
