import { createSelector } from 'reselect';

const selectAddResult = state => state.get('addResult');

const makeSelectIsCitiesDataReceived = () =>
  createSelector(selectAddResult, searchResult =>
    searchResult.get('citiesReceived'),
  );

const makeSelectCities = () =>
  createSelector(selectAddResult, searchState => searchState.get('cities'));

const makeSelectIsCityListReceived = () =>
  createSelector(selectAddResult, searchResult =>
    searchResult.get('cityListReceived'),
  );

const makeSelectCityList = () =>
  createSelector(selectAddResult, searchState => searchState.get('cityList'));

const makeSelectIsCompaniesDataReceived = () =>
  createSelector(selectAddResult, searchResult =>
    searchResult.get('companiesReceived'),
  );

const makeSelectCompanies = () =>
  createSelector(selectAddResult, searchState => searchState.get('companies'));

const makeSelectIsLanguagesDataReceived = () =>
  createSelector(selectAddResult, searchResult =>
    searchResult.get('languagesReceived'),
  );

const makeSelectLanguages = () =>
  createSelector(selectAddResult, searchState => searchState.get('languages'));

const makeSelectIsFlightsDataReceived = () =>
  createSelector(selectAddResult, searchResult =>
    searchResult.get('flightsReceived'),
  );

const makeSelectFlights = () =>
  createSelector(selectAddResult, searchState => searchState.get('flights'));

const makeSelectAdded = () =>
  createSelector(selectAddResult, searchState => searchState.get('added'));

const makeSelectAddError = () =>
  createSelector(selectAddResult, searchState => searchState.get('addError'));

const makeSelectDeleted = () =>
  createSelector(selectAddResult, searchState => searchState.get('deleted'));

export {
  makeSelectAdded,
  makeSelectAddError,
  makeSelectIsCitiesDataReceived,
  makeSelectCities,
  makeSelectIsCompaniesDataReceived,
  makeSelectCompanies,
  makeSelectIsFlightsDataReceived,
  makeSelectFlights,
  makeSelectIsLanguagesDataReceived,
  makeSelectLanguages,
  makeSelectIsCityListReceived,
  makeSelectCityList,
  makeSelectDeleted,
};
