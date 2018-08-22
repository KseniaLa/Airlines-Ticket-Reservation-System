import { takeEvery } from 'redux-saga/effects';
import { LOGOUT } from './constants';

function* logout() {
  try {
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
