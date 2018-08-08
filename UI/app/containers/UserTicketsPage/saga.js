import { put, takeEvery } from 'redux-saga/effects';
import { USER_TICKETS_REQUESTED } from './constants';
import { getUserTicketsSuccess, getUserTicketsError } from './actions';

import { tickets } from './tickets.json';

function* fetchUserTickets() {
  try {
    const result = tickets;
    yield put(getUserTicketsSuccess(result));
  } catch (e) {
    yield put(getUserTicketsError());
  }
}

export function* userTicketsSaga() {
  yield takeEvery(USER_TICKETS_REQUESTED, fetchUserTickets);
}
