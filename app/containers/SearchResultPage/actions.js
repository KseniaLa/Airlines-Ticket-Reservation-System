import {
  RESULT_TICKETS_REQUESTED,
  TICKETS_FETCH_SUCCEEDED,
  TICKETS_FETCH_FAILED,
} from './constants';

export function searchForTickets() {
  return {
    type: RESULT_TICKETS_REQUESTED,
    // here should be some extra data
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
