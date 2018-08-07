import { put, takeEvery } from 'redux-saga/effects';
import { TICKETS_REQUESTED } from './constants';
import { getTicketsSuccess, getTicketsError } from './actions';

function* fetchTickets() {
  try {
    const tickets = JSON.parse(localStorage.getItem('cartTickets'));
    yield put(getTicketsSuccess(tickets));
  } catch (e) {
    yield put(getTicketsError());
  }
}

export function* cartSaga() {
  yield takeEvery(TICKETS_REQUESTED, fetchTickets);
}
