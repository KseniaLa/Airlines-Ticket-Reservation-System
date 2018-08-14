import { call, put, takeEvery } from 'redux-saga/effects';
import { RESULT_CITIES_REQUESTED } from './constants';
import { getCitiesSuccess, getCitiesError } from './actions';
import { config } from '../../utils/configLoader';
import { emptyGet } from '../../utils/requestBuilder';

function* fetchCities(action) {
  try {
    const responce = yield call(
      fetch,
      config.APIUrl + config.APIOptions.popularCities + action.payload,
      emptyGet(),
    );
    if (responce.ok) {
      const result = yield responce.json();
      yield put(getCitiesSuccess(result.cities));
    } else {
      yield put(getCitiesError());
    }
  } catch (e) {
    yield put(getCitiesError());
  }
}

export function* citiesSaga() {
  yield takeEvery(RESULT_CITIES_REQUESTED, fetchCities);
}
