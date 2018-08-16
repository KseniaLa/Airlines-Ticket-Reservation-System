import {
  TICKETS_REQUESTED,
  TICKETS_FETCH_SUCCEEDED,
  TICKETS_FETCH_FAILED,
  DELETE_TICKET,
  ORDER_REQUESTED,
  ORDER_SUCCEEDED,
  ORDER_FAILED,
  DISCARD_ORDER_SUCCEEDED,
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

export function deleteTicketFromCart(ticketId) {
  return {
    type: DELETE_TICKET,
    payload: ticketId,
  };
}

export function makeOrder() {
  return {
    type: ORDER_REQUESTED,
  };
}

export function makeOrderSuccess(result) {
  return {
    type: ORDER_SUCCEEDED,
    payload: result,
  };
}

export function makeOrderError() {
  return {
    type: ORDER_FAILED,
  };
}

export function discardOrderSucceeded() {
  return {
    type: DISCARD_ORDER_SUCCEEDED,
  };
}
