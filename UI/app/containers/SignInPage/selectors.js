import { createSelector } from 'reselect';

const selectloginResult = state => state.get('loginResult');

const makeSelectIsLoginStateReceived = () =>
  createSelector(selectloginResult, result => result.get('loginStateReceived'));

const makeSelectIsLoginError = () =>
  createSelector(selectloginResult, result => result.get('loginError'));

const makeSelectIsRegistered = () =>
  createSelector(selectloginResult, result => result.get('registered'));

const makeSelectSignUpError = () =>
  createSelector(selectloginResult, result => result.get('signupError'));

// const makeSelectIsSigninStateReceived = () =>
//   createSelector(selectloginResult, result =>
//     result.get('signupStateReceived'),
//   );

export {
  makeSelectIsLoginStateReceived,
  makeSelectIsLoginError,
  makeSelectIsRegistered,
  // makeSelectIsSigninStateReceived,
  makeSelectSignUpError,
};
