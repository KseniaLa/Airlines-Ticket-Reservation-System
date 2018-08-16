import { createSelector } from 'reselect';

const selectSearchResult = state => state.get('searchResult');

const makeSelectIsDataReceived = () =>
  createSelector(selectSearchResult, searchResult =>
    searchResult.get('dataReceived'),
  );

const makeSelectTickets = () =>
  createSelector(selectSearchResult, searchState => searchState.get('data'));

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
  makeSelectIsTicketAddError,
  makeSelectIsTicketAdded,
};
