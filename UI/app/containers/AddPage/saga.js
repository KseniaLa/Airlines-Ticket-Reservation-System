import { call, put, takeEvery } from 'redux-saga/effects';
import {
  TICKETS_ADD_REQUESTED,
  CITIES_REQUESTED,
  COMPANIES_REQUESTED,
  CITY_ADD_REQUESTED,
  COMPANY_ADD_REQUESTED,
} from './constants';
import {
  addTicketSuccess,
  addTicketError,
  getAllCitiesSuccess,
  getAllCitiesError,
  getAllCompaniesSuccess,
  getAllCompaniesError,
  addLocationSuccess,
  addLocationError,
} from './actions';
import { config } from '../../utils/configLoader';
import { authPut, authGet, authPutString } from '../../utils/requestBuilder';

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

function* addLocation(action) {
  try {
    let urlOption;
    switch (action.type) {
      case CITY_ADD_REQUESTED:
        urlOption = config.APIOptions.addCity;
        break;
      case COMPANY_ADD_REQUESTED:
        urlOption = config.APIOptions.addCompany;
        break;
      default:
        urlOption = '';
    }
    const responce = yield call(
      fetch,
      config.APIUrl + urlOption,
      authPutString(action.payload, localStorage.getItem('token')),
    );
    if (responce.ok) {
      yield put(addLocationSuccess());
    } else {
      yield put(addLocationError());
    }
  } catch (e) {
    yield put(addLocationError());
  }
}

export function* addSaga() {
  yield takeEvery(TICKETS_ADD_REQUESTED, addTickets);
  yield takeEvery(CITIES_REQUESTED, getCities);
  yield takeEvery(COMPANIES_REQUESTED, getCompanies);
  yield takeEvery(CITY_ADD_REQUESTED, addLocation);
  yield takeEvery(COMPANY_ADD_REQUESTED, addLocation);
}
