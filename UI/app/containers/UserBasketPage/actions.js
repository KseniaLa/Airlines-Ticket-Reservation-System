import {
  TICKETS_REQUESTED,
  TICKETS_FETCH_SUCCEEDED,
  TICKETS_FETCH_FAILED,
} from './constants';

export function getCartTickets(lang) {
  return {
    type: TICKETS_REQUESTED,
    payload: lang,
  };
}

export function getTicketsSuccess(result) {
  return {
    type: TICKETS_FETCH_SUCCEEDED,
    payload: result,
  };
}

export function getTicketsError() {
  return {
    type: TICKETS_FETCH_FAILED,
  };
}
