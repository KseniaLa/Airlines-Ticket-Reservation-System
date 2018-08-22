import { call, put, takeEvery } from 'redux-saga/effects';
import { USER_TICKETS_REQUESTED, CANCEL_REQUESTED } from './constants';
import { config } from '../../utils/configLoader';
import { restoreAuth } from '../App/actions';
import { authGet, cancelTicketPost } from '../../utils/requestBuilder';
import {
  getUserTicketsSuccess,
  getUserTicketsError,
  cancelTicketSuccess,
  cancelTicketError,
} from './actions';

function* fetchUserTickets(action) {
  try {
    const responce = yield call(
      fetch,
      config.APIUrl + config.APIOptions.getUserTickets + action.payload,
      authGet(localStorage.getItem('token')),
    );
    if (responce.ok) {
      const result = yield responce.json();
      yield put(getUserTicketsSuccess(result.orders));
    } else if (responce.status === 401) {
      yield put(restoreAuth());
    } else {
      yield put(getUserTicketsError());
    }
  } catch (e) {
    yield put(getUserTicketsError());
  }
}

function* cancelTicket(action) {
  try {
    const responce = yield call(
      fetch,
      config.APIUrl + config.APIOptions.ticketCancellation,
      cancelTicketPost(action.payload, localStorage.getItem('token')),
    );
    if (responce.ok) {
      yield put(cancelTicketSuccess());
    } else if (responce.status === 401) {
      yield put(restoreAuth());
    } else {
      yield put(cancelTicketError());
    }
  } catch (e) {
    yield put(cancelTicketError());
  }
}

export function* userTicketsSaga() {
  yield takeEvery(USER_TICKETS_REQUESTED, fetchUserTickets);
  yield takeEvery(CANCEL_REQUESTED, cancelTicket);
}
