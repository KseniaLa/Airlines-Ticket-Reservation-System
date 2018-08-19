import { call, put, takeEvery } from 'redux-saga/effects';
import { TICKETS_ADD_REQUESTED } from './constants';
import { addTicketSuccess, addTicketError } from './actions';
import { config } from '../../utils/configLoader';
import { authPut } from '../../utils/requestBuilder';

function* addTickets(action) {
  try {
    alert('lol');
    const responce = yield call(
      fetch,
      config.APIUrl + config.APIOptions.addTickets,
      authPut(action.payload, localStorage.getItem('token')),
    );
    if (responce.ok) {
      yield put(addTicketSuccess());
    } else {
      yield put(addTicketError());
    }
  } catch (e) {
    yield put(addTicketError());
  }
}

export function* addSaga() {
  yield takeEvery(TICKETS_ADD_REQUESTED, addTickets);
}
