import {
  CONFIRMATION_REQUESTED,
  CONFIRMATION_SUCCEEDED,
  CONFIRMATION_FAILED,
} from './constants';

export function confirmEmail(token) {
  return {
    type: CONFIRMATION_REQUESTED,
    payload: token,
  };
}

export function confirmEmailSuccess() {
  return {
    type: CONFIRMATION_SUCCEEDED,
  };
}

export function confirmEmailError() {
  return {
    type: CONFIRMATION_FAILED,
  };
}
