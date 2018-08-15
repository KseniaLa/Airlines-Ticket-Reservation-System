import { call, put, takeEvery } from 'redux-saga/effects';
import { HISTORY_REQUESTED } from './constants';
import { getUserIpHistorySuccess, getUserIpHistoryError } from './actions';
import { config } from '../../utils/configLoader';
import { authGet } from '../../utils/requestBuilder';

function* fetchIpHistory() {
  try {
    const responce = yield call(
      fetch,
      config.APIUrl + config.APIOptions.userHistory,
      authGet(localStorage.getItem('token')),
    );
    if (responce.ok) {
      const result = yield responce.json();
      yield put(getUserIpHistorySuccess(result.addresses));
    } else {
      yield put(getUserIpHistoryError());
    }
  } catch (e) {
    console.log(e);
    yield put(getUserIpHistoryError());
  }
}

export function* historySaga() {
  yield takeEvery(HISTORY_REQUESTED, fetchIpHistory);
}
