import {
  TRY_LOGIN,
  TRY_LOGIN_SUCCEEDED,
  TRY_LOGIN_FAILED,
  DISCARD_LOGIN_INFO,
  TRY_SIGNUP,
  TRY_SIGNUP_SUCCEEDED,
  TRY_SIGNUP_FAILED,
  USER_REGISTERED,
  DISCARD_USER_REGISTERED,
} from './constants';

export function tryLogin(uemail, upassword) {
  return {
    type: TRY_LOGIN,
    payload: { email: uemail, password: upassword },
  };
}

export function tryLoginSuccess(status) {
  return {
    type: TRY_LOGIN_SUCCEEDED,
    payload: status,
  };
}

export function tryLoginError() {
  return {
    type: TRY_LOGIN_FAILED,
  };
}

export function discardLogin() {
  return {
    type: DISCARD_LOGIN_INFO,
  };
}

export function trySignUp(uname, usurname, uemail, upassword) {
  return {
    type: TRY_SIGNUP,
    payload: {
      name: uname,
      surname: usurname,
      email: uemail,
      password: upassword,
    },
  };
}

export function trySignUpSuccess(status) {
  return {
    type: TRY_SIGNUP_SUCCEEDED,
    payload: status,
  };
}

export function trySignUpError() {
  return {
    type: TRY_SIGNUP_FAILED,
  };
}

export function signUpSuccess() {
  return {
    type: USER_REGISTERED,
  };
}

export function discardRegistered() {
  return {
    type: DISCARD_USER_REGISTERED,
  };
}
