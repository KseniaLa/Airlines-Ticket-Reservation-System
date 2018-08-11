import { LOGOUT, SIGN_IN } from './constants';

export function logout() {
  return {
    type: LOGOUT,
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
