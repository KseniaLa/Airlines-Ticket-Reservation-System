import { createSelector } from 'reselect';

const selectAddResult = state => state.get('addResult');

const makeSelectIsCitiesDataReceived = () =>
  createSelector(selectAddResult, searchResult =>
    searchResult.get('citiesReceived'),
  );

const makeSelectCities = () =>
  createSelector(selectAddResult, searchState => searchState.get('cities'));

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

const makeSelectLocationAdded = () =>
  createSelector(selectAddResult, searchState =>
    searchState.get('locationAdded'),
  );

const makeSelectLocationAddError = () =>
  createSelector(selectAddResult, searchState =>
    searchState.get('locationAddError'),
  );

const makeSelectTicketAdded = () =>
  createSelector(selectAddResult, searchState =>
    searchState.get('ticketAdded'),
  );

const makeSelectTicketAddError = () =>
  createSelector(selectAddResult, searchState =>
    searchState.get('ticketAddError'),
  );

const makeSelectFlightAdded = () =>
  createSelector(selectAddResult, searchState =>
    searchState.get('flightAdded'),
  );

const makeSelectFlightAddError = () =>
  createSelector(selectAddResult, searchState =>
    searchState.get('flightAddError'),
  );

const makeSelectLanguageAdded = () =>
  createSelector(selectAddResult, searchState =>
    searchState.get('languageAdded'),
  );

const makeSelectLanguageAddError = () =>
  createSelector(selectAddResult, searchState =>
    searchState.get('languageAddError'),
  );

export {
  makeSelectIsCitiesDataReceived,
  makeSelectCities,
  makeSelectIsCompaniesDataReceived,
  makeSelectCompanies,
  makeSelectTicketAdded,
  makeSelectTicketAddError,
  makeSelectFlightAdded,
  makeSelectFlightAddError,
  makeSelectLocationAdded,
  makeSelectLocationAddError,
  makeSelectIsFlightsDataReceived,
  makeSelectFlights,
  makeSelectIsLanguagesDataReceived,
  makeSelectLanguages,
  makeSelectLanguageAdded,
  makeSelectLanguageAddError,
};
