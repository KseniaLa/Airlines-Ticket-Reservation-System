import {
  USER_TICKETS_REQUESTED,
  USER_TICKETS_FETCH_SUCCEEDED,
  USER_TICKETS_FETCH_FAILED,
} from './constants';

export function getUserTickets(lang) {
  return {
    type: USER_TICKETS_REQUESTED,
    payload: lang,
  };
}

export function getUserTicketsSuccess(result) {
  return {
    type: USER_TICKETS_FETCH_SUCCEEDED,
    payload: result,
  };
}

export function getUserTicketsError() {
  return {
    type: USER_TICKETS_FETCH_FAILED,
  };
}
