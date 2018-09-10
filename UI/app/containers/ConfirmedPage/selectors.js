import { createSelector } from 'reselect';

const selectConfirmationResult = state => state.get('confirmation');

const makeSelectIsConfirmed = () =>
  createSelector(selectConfirmationResult, searchResult =>
    searchResult.get('confirmed'),
  );

const makeSelectConfirmationError = () =>
  createSelector(selectConfirmationResult, searchState =>
    searchState.get('confirmationError'),
  );

export { makeSelectIsConfirmed, makeSelectConfirmationError };
