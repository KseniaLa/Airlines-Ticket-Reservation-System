import { put, takeEvery } from 'redux-saga/effects';
import { TRY_LOGIN } from './constants';
import { tryLoginSuccess, tryLoginError } from './actions';
import { login } from '../App/actions';

import { user } from './user.json';

function* checkLogin(action) {
  try {
    const { email, password } = action.payload;
    if (email === user.email && password === user.password) {
      yield [
        put(login(user.name, user.surname, user.isAdmin)),
        put(tryLoginSuccess(true)),
      ];
    } else {
      yield put(tryLoginSuccess(true));
    }
  } catch (e) {
    yield put(tryLoginError());
  }
}

export function* tryLoginSaga() {
  yield takeEvery(TRY_LOGIN, checkLogin);
}
