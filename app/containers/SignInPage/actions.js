import {
  TRY_LOGIN,
  TRY_LOGIN_SUCCEEDED,
  TRY_LOGIN_FAILED,
  DISCARD_LOGIN_INFO,
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
