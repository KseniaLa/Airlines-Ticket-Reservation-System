import {
  USER_TICKETS_REQUESTED,
  USER_TICKETS_FETCH_SUCCEEDED,
  USER_TICKETS_FETCH_FAILED,
} from './constants';

export function getUserTickets() {
  return {
    type: USER_TICKETS_REQUESTED,
    // here should be some extra data (USER ID)
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
