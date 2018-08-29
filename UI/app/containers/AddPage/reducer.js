import { fromJS } from 'immutable';
import {
  TICKETS_ADD_SUCCEEDED,
  TICKETS_ADD_FAILED,
  FLIGHT_ADD_SUCCEEDED,
  FLIGHT_ADD_FAILED,
  LOCATION_ADD_SUCCEEDED,
  LOCATION_ADD_FAILED,
  CITIES_LIST_SUCCESS,
  CITIES_LIST_ERROR,
  CITIES_SUCCESS,
  CITIES_ERROR,
  COMPANIES_SUCCESS,
  COMPANIES_ERROR,
  FLIGHTS_SUCCEEDED,
  FLIGHTS_FAILED,
  LANGUAGES_SUCCESS,
  LANGUAGES_ERROR,
  LANGUAGE_ADD_SUCCEEDED,
  LANGUAGE_ADD_FAILED,
  CITY_DELETED,
  LANGUAGE_DELETED,
  DISCARD_STATE,
} from './constants';

const initialState = fromJS({
  added: false,
  addError: false,
  // ticketAddError: false,
  // ticketAdded: false,
  // flightAddError: false,
  // flightAdded: false,
  // locationAddError: false,
  // locationAdded: false,
  // languageAddError: false,
  // languageAdded: false,
  cityListReceived: false,
  cityList: null,
  citiesReceived: false,
  cities: null,
  companiesReceived: false,
  companies: null,
  flightsReceived: false,
  flights: null,
  languagesReceived: false,
  languages: null,
  deleted: false,
});

const addReducer = (state = initialState, action) => {
  switch (action.type) {
    case TICKETS_ADD_SUCCEEDED:
      return state.set('added', true).set('addError', false);
    case TICKETS_ADD_FAILED:
      return state.set('added', false).set('addError', true);
    case FLIGHT_ADD_SUCCEEDED:
      return state.set('added', true).set('addError', false);
    case FLIGHT_ADD_FAILED:
      return state.set('added', false).set('addError', true);
    case LANGUAGE_ADD_SUCCEEDED:
      return state.set('added', true).set('addError', false);
    case LANGUAGE_ADD_FAILED:
      return state.set('added', false).set('addError', true);
    case CITIES_SUCCESS:
      return state.set('citiesReceived', true).set('cities', action.payload);
    case CITIES_ERROR:
      return state.set('citiesReceived', false).set('cities', null);
    case CITIES_LIST_SUCCESS:
      return state
        .set('cityListReceived', true)
        .set('cityList', action.payload);
    case CITIES_LIST_ERROR:
      return state.set('cityListReceived', false).set('cityList', null);
    case FLIGHTS_SUCCEEDED:
      return state.set('flightsReceived', true).set('flights', action.payload);
    case FLIGHTS_FAILED:
      return state.set('flightsReceived', false).set('flights', null);
    case COMPANIES_SUCCESS:
      return state
        .set('companiesReceived', true)
        .set('companies', action.payload);
    case COMPANIES_ERROR:
      return state.set('companiesReceived', false).set('companies', null);
    case LOCATION_ADD_SUCCEEDED:
      return state.set('added', true).set('addError', false);
    case LOCATION_ADD_FAILED:
      return state.set('added', false).set('addError', true);
    case LANGUAGES_SUCCESS:
      return state
        .set('languagesReceived', true)
        .set('languages', action.payload);
    case LANGUAGES_ERROR:
      return state.set('languagesReceived', false).set('languages', null);
    case CITY_DELETED:
      return state.set('deleted', true);
    case LANGUAGE_DELETED:
      return state.set('deleted', true);
    case DISCARD_STATE:
      return initialState;
    default:
      return state;
  }
};

export default addReducer;
