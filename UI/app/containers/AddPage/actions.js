import {
  TICKETS_ADD_REQUESTED,
  TICKETS_ADD_SUCCEEDED,
  TICKETS_ADD_FAILED,
} from './constants';

export function addTicket(ticket) {
  return {
    type: TICKETS_ADD_REQUESTED,
    payload: ticket,
  };
}

export function addTicketSuccess() {
  return {
    type: TICKETS_ADD_SUCCEEDED,
  };
}

export function addTicketError() {
  return {
    type: TICKETS_ADD_FAILED,
  };
}
