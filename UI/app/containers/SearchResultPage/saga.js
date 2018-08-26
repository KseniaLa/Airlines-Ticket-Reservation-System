import { call, put, takeEvery } from 'redux-saga/effects';
import { RESULT_TICKETS_REQUESTED, ADD_TICKET } from './constants';
import {
  getTicketsSuccess,
  getTicketsError,
  addTicketSuccess,
  addTicketError,
} from './actions';
import { config } from '../../utils/configLoader';
import { searchPost } from '../../utils/requestBuilder';
import { addTicket } from '../../utils/localStorageManager';

function* fetchTickets(action) {
  try {
    const { from, to, date, flightClass, initial } = action.payload;
    const responce = yield call(
      fetch,
      `${config.APIUrl + config.APIOptions.resultTickets + action.language}/${
        action.itemCount
      }/${action.pageNum}`,
      searchPost(from, to, date, flightClass, initial),
    );
    if (responce.ok) {
      const result = yield responce.json();
      yield put(getTicketsSuccess(result.tickets, result.count));
    } else {
      yield put(getTicketsError());
    }
  } catch (e) {
    yield put(getTicketsError());
  }
}

function* addTicketToStorage(action) {
  try {
    if (addTicket('cartTickets', action.payload)) {
      yield put(addTicketSuccess());
    } else {
      yield put(addTicketError());
    }
  } catch (e) {
    yield put(addTicketError());
  }
}

export function* ticketsResultSaga() {
  yield takeEvery(RESULT_TICKETS_REQUESTED, fetchTickets);
}

export function* addTicketSaga() {
  yield takeEvery(ADD_TICKET, addTicketToStorage);
}
