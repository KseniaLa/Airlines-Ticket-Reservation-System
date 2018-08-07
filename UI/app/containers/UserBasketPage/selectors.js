import { createSelector } from 'reselect';

const selectCartResult = state => state.get('cartResult');

const makeSelectIsDataReceived = () =>
  createSelector(selectCartResult, result => result.get('dataReceived'));

const makeSelectTickets = () =>
  createSelector(selectCartResult, searchState => searchState.get('data'));

export { makeSelectIsDataReceived, makeSelectTickets };
