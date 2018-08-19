import { call, put, takeEvery } from 'redux-saga/effects';
import {
  TICKETS_ADD_REQUESTED,
  CITIES_REQUESTED,
  COMPANIES_REQUESTED,
} from './constants';
import {
  addTicketSuccess,
  addTicketError,
  getAllCitiesSuccess,
  getAllCitiesError,
  getAllCompaniesSuccess,
  getAllCompaniesError,
} from './actions';
import { config } from '../../utils/configLoader';
import { authPut, authGet } from '../../utils/requestBuilder';

function* addTickets(action) {
  try {
    const responce = yield call(
      fetch,
      config.APIUrl + config.APIOptions.addTickets,
      authPut(action.payload, localStorage.getItem('token')),
    );
    if (responce.ok) {
      yield put(addTicketSuccess());
    } else {
      yield put(addTicketError());
    }
  } catch (e) {
    yield put(addTicketError());
  }
}

function* getCities(action) {
  try {
    const responce = yield call(
      fetch,
      config.APIUrl + config.APIOptions.cities + action.payload,
      authGet(localStorage.getItem('token')),
    );
    if (responce.ok) {
      const result = yield responce.json();
      yield put(getAllCitiesSuccess(result.cities));
    } else {
      yield put(getAllCitiesError());
    }
  } catch (e) {
    yield put(getAllCitiesError());
  }
}

function* getCompanies(action) {
  try {
    const responce = yield call(
      fetch,
      config.APIUrl + config.APIOptions.companies + action.payload,
      authGet(localStorage.getItem('token')),
    );
    if (responce.ok) {
      const result = yield responce.json();
      yield put(getAllCompaniesSuccess(result.companies));
    } else {
      yield put(getAllCompaniesError());
    }
  } catch (e) {
    yield put(getAllCompaniesError());
  }
}

export function* addSaga() {
  yield takeEvery(TICKETS_ADD_REQUESTED, addTickets);
  yield takeEvery(CITIES_REQUESTED, getCities);
  yield takeEvery(COMPANIES_REQUESTED, getCompanies);
}
