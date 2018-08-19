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

export {
  makeSelectIsCitiesDataReceived,
  makeSelectCities,
  makeSelectIsCompaniesDataReceived,
  makeSelectCompanies,
  makeSelectTicketAdded,
  makeSelectTicketAddError,
  makeSelectLocationAdded,
  makeSelectLocationAddError,
};
