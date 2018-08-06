import {
  RESULT_TICKETS_REQUESTED,
  TICKETS_FETCH_SUCCEEDED,
  TICKETS_FETCH_FAILED,
  DISCARD_DATA_READY,
} from './constants';

export function searchForTickets(search) {
  return {
    type: RESULT_TICKETS_REQUESTED,
    payload: search,
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

export function discardDataReady() {
  return {
    type: DISCARD_DATA_READY,
  };
}
