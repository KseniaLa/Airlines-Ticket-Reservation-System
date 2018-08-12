import { call, put, takeEvery } from 'redux-saga/effects';
import { USER_TICKETS_REQUESTED } from './constants';
import { config } from '../../utils/configLoader';
import { authGet } from '../../utils/requestBuilder';
import { getUserTicketsSuccess, getUserTicketsError } from './actions';

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
    } else {
      yield put(getUserTicketsError());
    }
  } catch (e) {
    yield put(getUserTicketsError());
  }
}

export function* userTicketsSaga() {
  yield takeEvery(USER_TICKETS_REQUESTED, fetchUserTickets);
}
