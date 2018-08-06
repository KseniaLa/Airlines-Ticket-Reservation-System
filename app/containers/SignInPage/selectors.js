import { createSelector } from 'reselect';

const selectloginResult = state => state.get('loginResult');

const makeSelectIsLoginStateReceived = () =>
  createSelector(selectloginResult, result => result.get('loginStateReceived'));

const makeSelectIsLoginError = () =>
  createSelector(selectloginResult, result => result.get('loginError'));

export { makeSelectIsLoginStateReceived, makeSelectIsLoginError };
