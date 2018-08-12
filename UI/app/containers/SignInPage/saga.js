import { call, put, takeEvery } from 'redux-saga/effects';
import { TRY_LOGIN, TRY_SIGNUP } from './constants';
import {
  tryLoginSuccess,
  tryLoginError,
  trySignUpSuccess,
  trySignUpError,
  signUpSuccess,
} from './actions';
import { login } from '../App/actions';
import { config } from '../../utils/configLoader';
import { loginPost, signupPost } from '../../utils/requestBuilder';

function* checkLogin(action) {
  try {
    const { email, password } = action.payload;
    const responce = yield call(
      fetch,
      config.APIUrl + config.APIOptions.login,
      loginPost(email, password),
    );
    if (responce.ok) {
      const result = yield responce.json();
      localStorage.setItem('token', result.token);
      yield [
        put(login(result.name, result.surname, result.isAdmin, result.token)),
        put(tryLoginSuccess(true)),
      ];
    } else {
      yield put(tryLoginSuccess(true));
    }
  } catch (e) {
    console.log(e);
    yield put(tryLoginError());
  }
}

function* register(action) {
  try {
    const { name, surname, email, password } = action.payload;
    const responce = yield call(
      fetch,
      config.APIUrl + config.APIOptions.signup,
      signupPost(name, surname, email, password),
    );
    console.log(responce);
    if (responce.ok) {
      yield [put(trySignUpSuccess(true)), put(signUpSuccess())];
    } else {
      yield put(trySignUpSuccess(true));
    }
  } catch (e) {
    console.log(e);
    yield put(trySignUpError());
  }
}

export function* tryLoginSaga() {
  yield takeEvery(TRY_LOGIN, checkLogin);
}

export function* trySignUpSaga() {
  yield takeEvery(TRY_SIGNUP, register);
}
