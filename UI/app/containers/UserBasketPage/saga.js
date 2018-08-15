import { call, put, takeEvery } from 'redux-saga/effects';
import { TICKETS_REQUESTED } from './constants';
import { getTicketsSuccess, getTicketsError } from './actions';
import { config } from '../../utils/configLoader';
import { getTicketsPost } from '../../utils/requestBuilder';

function* fetchTickets(action) {
  try {
    const responce = yield call(
      fetch,
      config.APIUrl + config.APIOptions.userCart + action.payload,
      getTicketsPost(localStorage.getItem('cartTickets')),
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

export function* cartSaga() {
  yield takeEvery(TICKETS_REQUESTED, fetchTickets);
}
