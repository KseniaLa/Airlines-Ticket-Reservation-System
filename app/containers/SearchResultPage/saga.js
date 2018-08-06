import { put, takeEvery } from 'redux-saga/effects';
import { RESULT_TICKETS_REQUESTED } from './constants';
import { getTicketsSuccess, getTicketsError } from './actions';

import { tickets } from './result.json';
import { notickets } from './emptyresult.json';

function* fetchTickets(action) {
  try {
    let result;
    if (action.payload === 'no') {
      result = notickets;
    } else {
      result = tickets;
    }
    yield put(getTicketsSuccess(result));
  } catch (e) {
    yield put(getTicketsError());
  }
}

export function* ticketsResultSaga() {
  yield takeEvery(RESULT_TICKETS_REQUESTED, fetchTickets);
}
