import { createSelector } from 'reselect';

const selectUserTickets = state => state.get('userTickets');

const makeSelectIsDataReceived = () =>
  createSelector(selectUserTickets, userTickets =>
    userTickets.get('dataReceived'),
  );

const makeSelectUserTickets = () =>
  createSelector(selectUserTickets, searchState => searchState.get('data'));

export { makeSelectIsDataReceived, makeSelectUserTickets };
