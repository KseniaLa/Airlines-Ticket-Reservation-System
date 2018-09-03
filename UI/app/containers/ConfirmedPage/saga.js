import { call, put, takeEvery } from 'redux-saga/effects';
import { CONFIRMATION_REQUESTED } from './constants';
import { confirmEmailSuccess, confirmEmailError } from './actions';
import { config } from '../../utils/configLoader';
import { emptyGet } from '../../utils/requestBuilder';

function* confirm(action) {
  try {
    const responce = yield call(
      fetch,
      config.APIUrl + config.APIOptions.confirm + action.payload,
      emptyGet(),
    );
    if (responce.ok) {
      yield put(confirmEmailSuccess());
    } else {
      yield put(confirmEmailError());
    }
  } catch (e) {
    yield put(confirmEmailError());
  }
}

export function* confirmSaga() {
  yield takeEvery(CONFIRMATION_REQUESTED, confirm);
}
