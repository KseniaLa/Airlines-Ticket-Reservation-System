import { call, put, takeEvery } from 'redux-saga/effects';
import { USER_TICKETS_REQUESTED } from './constants';
import { config } from '../../utils/configLoader';
import { authGet } from '../../utils/requestBuilder';
import { getUserTicketsSuccess, getUserTicketsError } from './actions';

function* fetchUserTickets() {
  try {
    const responce = yield call(
      fetch,
      config.APIUrl + config.APIOptions.getUserTickets,
      authGet(localStorage.getItem('token')),
    );
    console.log(responce);
    yield put(getUserTicketsSuccess(responce));
  } catch (e) {
    yield put(getUserTicketsError());
  }
}

export function* userTicketsSaga() {
  yield takeEvery(USER_TICKETS_REQUESTED, fetchUserTickets);
}
