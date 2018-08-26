import { call, takeEvery } from 'redux-saga/effects';
import { LOGOUT } from './constants';
import { config } from '../../utils/configLoader';
import { authPost } from '../../utils/requestBuilder';

function* logout() {
  try {
    const responce = yield call(
      fetch,
      config.APIUrl + config.APIOptions.logout,
      authPost(localStorage.getItem('token')),
    );
    localStorage.removeItem('token');
    localStorage.removeItem('cartTickets');
    yield 'ok';
  } catch (e) {
    console.log(e);
    yield 'error';
  }
}

export function* logoutSaga() {
  yield takeEvery(LOGOUT, logout);
}
