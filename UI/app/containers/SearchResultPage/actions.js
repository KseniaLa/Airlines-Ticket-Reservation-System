import {
  RESULT_TICKETS_REQUESTED,
  TICKETS_FETCH_SUCCEEDED,
  TICKETS_FETCH_FAILED,
  DISCARD_DATA_READY,
  ADD_SUCCEEDED,
  ADD_FAILED,
  ADD_TICKET,
  DISCARD_ADD_STATE,
} from './constants';

export function searchForTickets(
  from,
  to,
  date,
  flightClass,
  lang,
  count,
  page,
  initial,
) {
  return {
    type: RESULT_TICKETS_REQUESTED,
    payload: { from, to, date, flightClass, initial },
    language: lang,
    itemCount: count,
    pageNum: page,
  };
}

export function getTicketsSuccess(tickets, count) {
  return {
    type: TICKETS_FETCH_SUCCEEDED,
    payload: { tickets, count },
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

export function addTicket(ticket) {
  return {
    type: ADD_TICKET,
    payload: ticket,
  };
}

export function addTicketSuccess() {
  return {
    type: ADD_SUCCEEDED,
  };
}

export function addTicketError() {
  return {
    type: ADD_FAILED,
  };
}

export function discardAddState() {
  return {
    type: DISCARD_ADD_STATE,
  };
}
