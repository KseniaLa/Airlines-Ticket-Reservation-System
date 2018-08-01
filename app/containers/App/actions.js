import { MODAL_STATE, LOGOUT, SIGN_IN } from './constants';

export function setModalState(isVisible) {
  return {
    type: MODAL_STATE,
    payload: isVisible,
  };
}

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
