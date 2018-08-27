import { put, call, takeEvery } from 'redux-saga/effects';
import { LOGOUT, TRY_LOGIN } from './constants';
import { config } from '../../utils/configLoader';
import { authPost } from '../../utils/requestBuilder';
import { logout, login } from './actions';

function* logoutUser() {
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
    yield 'error';
  }
}

function* tryLogin() {
  try {
    if (localStorage.getItem('token') === null) {
      yield put(logout());
    } else {
      const responce = yield call(
        fetch,
        config.APIUrl + config.APIOptions.updateUser,
        authPost(localStorage.getItem('token')),
      );
      if (responce.ok) {
        const result = yield responce.json();
        localStorage.setItem('token', result.token);
        yield put(
          login(result.name, result.surname, result.isAdmin, result.token),
        );
      } else {
        yield put(logout());
      }
    }
  } catch (e) {
    console.log(e);
    yield put(logout());
  }
}

export function* logoutSaga() {
  yield takeEvery(LOGOUT, logoutUser);
  yield takeEvery(TRY_LOGIN, tryLogin);
}
