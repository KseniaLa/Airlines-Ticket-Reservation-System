import { createSelector } from 'reselect';

const selectSearchResult = state => state.get('searchResult');

const makeSelectTickets = () =>
  createSelector(selectSearchResult, searchState =>
    searchState.get('searchTickets'),
  );

export { makeSelectTickets };
