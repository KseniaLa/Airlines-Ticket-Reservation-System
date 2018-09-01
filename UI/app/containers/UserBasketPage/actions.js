import {
  TICKETS_REQUESTED,
  TICKETS_FETCH_SUCCEEDED,
  TICKETS_FETCH_FAILED,
  DELETE_TICKET,
  TICKET_DELETED,
  ORDER_REQUESTED,
  ORDER_SUCCEEDED,
  ORDER_FAILED,
  DISCARD_STATE,
  UPDATE_TICKET,
  DISCARD_ORDER,
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

export function setDeleteState(isSuccess) {
  return {
    type: TICKET_DELETED,
    payload: isSuccess,
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

export function discardState() {
  return {
    type: DISCARD_STATE,
  };
}

export function updateTicketCount(id, count) {
  return {
    type: UPDATE_TICKET,
    payload: { ticket: id, count },
  };
}

export function discardOrderState() {
  return {
    type: DISCARD_ORDER,
  };
}
