import { MODAL_STATE, LOGOUT } from './constants';

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
