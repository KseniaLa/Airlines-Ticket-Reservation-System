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
import { tickets } from './result.json';
import { notickets } from './emptyresult.json';

function* fetchTickets(action) {
  try {
    const { from, to, date, flightClass } = action.payload;
    let result = yield call(
      fetch,
      config.APIUrl + config.APIOptions.resultTickets + 'en',
      searchPost(from, to, date, flightClass),
    );
    if (action.payload.from === 'no') {
      result = notickets;
    } else {
      result = tickets;
    }
    yield put(getTicketsSuccess(result));
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
