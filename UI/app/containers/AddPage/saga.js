import { call, put, takeEvery } from 'redux-saga/effects';
import {
  TICKETS_ADD_REQUESTED,
  FLIGHT_ADD_REQUESTED,
  CITIES_REQUESTED,
  COMPANIES_REQUESTED,
  CITY_ADD_REQUESTED,
  COMPANY_ADD_REQUESTED,
  FLIGHTS_REQUESTED,
  LANGUAGE_ADD_REQUESTED,
  LANGUAGES_REQUESTED,
  CITIES_LIST_REQUESTED,
  CITY_UPDATE_REQUESTED,
  CITY_DELETE_REQUESTED,
  LANGUAGE_DELETE_REQUESTED,
} from './constants';
import {
  addTicketSuccess,
  addTicketError,
  addFlightSuccess,
  addFlightError,
  getAllCitiesSuccess,
  getAllCitiesError,
  getAllCompaniesSuccess,
  getAllCompaniesError,
  getAllFlightsSuccess,
  getAllFlightsError,
  addLocationSuccess,
  addLocationError,
  addLanguageSuccess,
  addLanguageError,
  getLanguagesSuccess,
  getLanguagesError,
  getCitiesListSuccess,
  getCitiesListError,
  deleteCitySuccess,
  deleteLangSuccess,
} from './actions';
import { restoreAuth } from '../App/actions';
import { config } from '../../utils/configLoader';
import {
  authPut,
  authGet,
  authPutString,
  authDelete,
} from '../../utils/requestBuilder';

function* addTickets(action) {
  try {
    const responce = yield call(
      fetch,
      config.APIUrl + config.APIOptions.addTickets,
      authPut(action.payload, localStorage.getItem('token')),
    );
    if (responce.ok) {
      yield put(addTicketSuccess());
    } else if (responce.status === 401) {
      yield put(restoreAuth());
    } else {
      yield put(addTicketError());
    }
  } catch (e) {
    yield put(addTicketError());
  }
}

function* addFlight(action) {
  try {
    const responce = yield call(
      fetch,
      config.APIUrl + config.APIOptions.addFlight,
      authPut(action.payload, localStorage.getItem('token')),
    );
    if (responce.ok) {
      yield put(addFlightSuccess());
    } else if (responce.status === 401) {
      yield put(restoreAuth());
    } else {
      yield put(addFlightError());
    }
  } catch (e) {
    yield put(addFlightError());
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
    } else if (responce.status === 401) {
      yield put(restoreAuth());
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
    } else if (responce.status === 401) {
      yield put(restoreAuth());
    } else {
      yield put(getAllCompaniesError());
    }
  } catch (e) {
    yield put(getAllCompaniesError());
  }
}

function* getCityList(action) {
  try {
    const responce = yield call(
      fetch,
      config.APIUrl + config.APIOptions.getCityList + action.payload,
      authGet(localStorage.getItem('token')),
    );
    if (responce.ok) {
      const result = yield responce.json();
      yield put(getCitiesListSuccess(result.cities));
    } else if (responce.status === 401) {
      yield put(restoreAuth());
    } else {
      yield put(getCitiesListError());
    }
  } catch (e) {
    yield put(getCitiesListError());
  }
}

function* getFlights(action) {
  try {
    const responce = yield call(
      fetch,
      config.APIUrl + config.APIOptions.flights + action.payload,
      authGet(localStorage.getItem('token')),
    );
    if (responce.ok) {
      const result = yield responce.json();
      yield put(getAllFlightsSuccess(result.flights));
    } else if (responce.status === 401) {
      yield put(restoreAuth());
    } else {
      yield put(getAllFlightsError());
    }
  } catch (e) {
    yield put(getAllFlightsError());
  }
}

function* deleteCity(action) {
  try {
    const responce = yield call(
      fetch,
      config.APIUrl + config.APIOptions.deleteCity + action.payload,
      authDelete(localStorage.getItem('token')),
    );
    if (responce.ok) {
      yield put(deleteCitySuccess());
    } else if (responce.status === 401) {
      yield put(restoreAuth());
    } else {
      yield 'error';
    }
  } catch (e) {
    yield 'error';
  }
}

function* deleteLang(action) {
  try {
    const responce = yield call(
      fetch,
      config.APIUrl + config.APIOptions.deleteLang + action.payload,
      authDelete(localStorage.getItem('token')),
    );
    if (responce.ok) {
      yield put(deleteLangSuccess());
    } else if (responce.status === 401) {
      yield put(restoreAuth());
    } else {
      yield 'error';
    }
  } catch (e) {
    yield 'error';
  }
}

function* getLanguages() {
  try {
    const responce = yield call(
      fetch,
      config.APIUrl + config.APIOptions.getLanguages,
      authGet(localStorage.getItem('token')),
    );
    if (responce.ok) {
      const result = yield responce.json();
      yield put(getLanguagesSuccess(result.languages));
    } else if (responce.status === 401) {
      yield put(restoreAuth());
    } else {
      yield put(getLanguagesError());
    }
  } catch (e) {
    yield put(getLanguagesError());
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
    } else if (responce.status === 401) {
      yield put(restoreAuth());
    } else {
      yield put(addLocationError());
    }
  } catch (e) {
    yield put(addLocationError());
  }
}

function* updateCity(action) {
  try {
    const responce = yield call(
      fetch,
      config.APIUrl + config.APIOptions.updateCity + action.id,
      authPutString(action.payload, localStorage.getItem('token')),
    );
    if (responce.ok) {
      yield put(addLocationSuccess());
    } else if (responce.status === 401) {
      yield put(restoreAuth());
    } else {
      yield put(addLocationError());
    }
  } catch (e) {
    yield put(addLocationError());
  }
}

function* addLanguage(action) {
  try {
    const responce = yield call(
      fetch,
      config.APIUrl + config.APIOptions.addLanguage,
      authPut(action.payload, localStorage.getItem('token')),
    );
    if (responce.ok) {
      yield put(addLanguageSuccess());
    } else if (responce.status === 401) {
      yield put(restoreAuth());
    } else {
      yield put(addLanguageError());
    }
  } catch (e) {
    yield put(addLanguageError());
  }
}

export function* addSaga() {
  yield takeEvery(TICKETS_ADD_REQUESTED, addTickets);
  yield takeEvery(FLIGHT_ADD_REQUESTED, addFlight);
  yield takeEvery(CITIES_REQUESTED, getCities);
  yield takeEvery(COMPANIES_REQUESTED, getCompanies);
  yield takeEvery(CITY_ADD_REQUESTED, addLocation);
  yield takeEvery(COMPANY_ADD_REQUESTED, addLocation);
  yield takeEvery(FLIGHTS_REQUESTED, getFlights);
  yield takeEvery(LANGUAGES_REQUESTED, getLanguages);
  yield takeEvery(LANGUAGE_ADD_REQUESTED, addLanguage);
  yield takeEvery(CITIES_LIST_REQUESTED, getCityList);
  yield takeEvery(CITY_UPDATE_REQUESTED, updateCity);
  yield takeEvery(CITY_DELETE_REQUESTED, deleteCity);
  yield takeEvery(LANGUAGE_DELETE_REQUESTED, deleteLang);
}
