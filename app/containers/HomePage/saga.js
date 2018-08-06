import { put, takeEvery } from 'redux-saga/effects';
import { RESULT_CITIES_REQUESTED } from './constants';
import { getCitiesSuccess, getCitiesError } from './actions';

import { cities } from './popular.json';

function* fetchCities() {
  try {
    const result = cities;
    yield put(getCitiesSuccess(result));
  } catch (e) {
    yield put(getCitiesError());
  }
}

export function* citiesSaga() {
  yield takeEvery(RESULT_CITIES_REQUESTED, fetchCities);
}
