import { createSelector } from 'reselect';

const selectUserTickets = state => state.get('userTickets');

const makeSelectIsDataReceived = () =>
  createSelector(selectUserTickets, userTickets =>
    userTickets.get('dataReceived'),
  );

const makeSelectUserTickets = () =>
  createSelector(selectUserTickets, searchState => searchState.get('data'));

const makeSelectCancelled = () =>
  createSelector(selectUserTickets, searchState =>
    searchState.get('cancelled'),
  );

const makeSelectIsCancelError = () =>
  createSelector(selectUserTickets, searchState =>
    searchState.get('cancelError'),
  );

export {
  makeSelectIsDataReceived,
  makeSelectUserTickets,
  makeSelectCancelled,
  makeSelectIsCancelError,
};
