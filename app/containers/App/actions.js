import { LOGOUT, SIGN_IN } from './constants';

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function login(name, surname, isAdmin) {
  return {
    type: SIGN_IN,
    payload: `${name} ${surname}`,
    isadmin: isAdmin,
  };
}
