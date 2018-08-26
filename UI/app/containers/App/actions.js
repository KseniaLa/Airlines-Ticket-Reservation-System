import { LOGOUT, SIGN_IN, SET_SEARCH, RESTORE, TRY_LOGIN } from './constants';

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function tryLogin() {
  return {
    type: TRY_LOGIN,
  };
}

export function login(name, surname, isAdmin, token) {
  return {
    type: SIGN_IN,
    userName: name,
    userSurname: surname,
    isadmin: isAdmin,
    access_token: token,
  };
}

export function setSearch(from, to, date, flightClass) {
  return {
    type: SET_SEARCH,
    from,
    to,
    date,
    flightClass,
  };
}

export function restoreAuth() {
  return {
    type: RESTORE,
  };
}
