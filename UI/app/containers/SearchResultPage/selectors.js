import { createSelector } from 'reselect';

const selectSearchResult = state => state.get('searchResult');

const selectGlobal = state => state.get('global');

const makeSelectSearch = () =>
  createSelector(selectGlobal, globalState => globalState.get('search'));

const makeSelectFrom = () =>
  createSelector(makeSelectSearch(), search => search.get('from'));

const makeSelectTo = () =>
  createSelector(makeSelectSearch(), search => search.get('to'));

const makeSelectDate = () =>
  createSelector(makeSelectSearch(), search => search.get('date'));

const makeSelectClass = () =>
  createSelector(makeSelectSearch(), search => search.get('flightClass'));

const makeSelectIsDataReceived = () =>
  createSelector(selectSearchResult, searchResult =>
    searchResult.get('dataReceived'),
  );

const makeSelectTickets = () =>
  createSelector(selectSearchResult, searchState => searchState.get('data'));

const makeSelectCount = () =>
  createSelector(selectSearchResult, searchState => searchState.get('count'));

const makeSelectIsTicketAddError = () =>
  createSelector(selectSearchResult, searchState =>
    searchState.get('ticketAddError'),
  );

const makeSelectIsTicketAdded = () =>
  createSelector(selectSearchResult, searchState =>
    searchState.get('ticketAdded'),
  );

export {
  makeSelectIsDataReceived,
  makeSelectTickets,
  makeSelectCount,
  makeSelectIsTicketAddError,
  makeSelectIsTicketAdded,
  makeSelectFrom,
  makeSelectTo,
  makeSelectDate,
  makeSelectClass,
};
