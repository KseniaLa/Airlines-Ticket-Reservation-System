import {
  USER_TICKETS_REQUESTED,
  USER_TICKETS_FETCH_SUCCEEDED,
  USER_TICKETS_FETCH_FAILED,
  CANCEL_REQUESTED,
  CANCEL_TICKET_SUCCEEDED,
  CANCEL_TICKET_FAILED,
  DISCARD_CANCEL_STATE,
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

export function cancelUserTicket(ticketId) {
  return {
    type: CANCEL_REQUESTED,
    payload: ticketId,
  };
}

export function cancelTicketSuccess() {
  return {
    type: CANCEL_TICKET_SUCCEEDED,
  };
}

export function cancelTicketError() {
  return {
    type: CANCEL_TICKET_FAILED,
  };
}

export function discardCancelState() {
  return {
    type: DISCARD_CANCEL_STATE,
  };
}
