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

function* fetchTickets(action) {
  try {
    const { from, to, date, flightClass } = action.payload;
    const responce = yield call(
      fetch,
      config.APIUrl + config.APIOptions.resultTickets + action.language,
      searchPost(from, to, date, flightClass),
    );
    if (responce.ok) {
      const result = yield responce.json();
      yield put(getTicketsSuccess(result.tickets));
    } else {
      yield put(getTicketsError());
    }
  } catch (e) {
    yield put(getTicketsError());
  }
}

function* addTicketToStorage(action) {
  try {
    if (localStorage.getItem('cartTickets') === null) {
      localStorage.setItem('cartTickets', JSON.stringify([action.payload]));
    } else {
      const currTickets = JSON.parse(localStorage.getItem('cartTickets'));
      currTickets.push = [].push;
      currTickets.push(action.payload);
      localStorage.setItem('cartTickets', JSON.stringify(currTickets));
    }
    yield put(addTicketSuccess());
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
