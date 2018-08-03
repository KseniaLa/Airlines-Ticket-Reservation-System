import { put, takeEvery } from 'redux-saga/effects';
import { RESULT_TICKETS_REQUESTED } from './constants';
import { getTicketsSuccess, getTicketsError } from './actions';

import { tickets } from './result.json';

function* fetchTickets() {
  try {
    const result = tickets;
    yield put(getTicketsSuccess(result));
  } catch (e) {
    yield put(getTicketsError());
  }
}

export function* ticketsResultSaga() {
  yield takeEvery(RESULT_TICKETS_REQUESTED, fetchTickets);
}
