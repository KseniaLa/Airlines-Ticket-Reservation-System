import { createSelector } from 'reselect';

const selectCartResult = state => state.get('cartResult');

const makeSelectIsDataReceived = () =>
  createSelector(selectCartResult, result => result.get('dataReceived'));

const makeSelectTickets = () =>
  createSelector(selectCartResult, searchState => searchState.get('data'));

const makeSelectCartSubmitted = () =>
  createSelector(selectCartResult, searchState =>
    searchState.get('cartSubmitted'),
  );

export { makeSelectIsDataReceived, makeSelectTickets, makeSelectCartSubmitted };
