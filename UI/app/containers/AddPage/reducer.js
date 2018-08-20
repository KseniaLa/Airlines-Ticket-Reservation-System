import { fromJS } from 'immutable';
import {
  TICKETS_ADD_SUCCEEDED,
  TICKETS_ADD_FAILED,
  LOCATION_ADD_SUCCEEDED,
  LOCATION_ADD_FAILED,
  CITIES_SUCCESS,
  CITIES_ERROR,
  COMPANIES_SUCCESS,
  COMPANIES_ERROR,
  FLIGHTS_SUCCEEDED,
  FLIGHTS_FAILED,
  DISCARD_STATE,
} from './constants';

const initialState = fromJS({
  ticketAddError: false,
  ticketAdded: false,
  locationAddError: false,
  locationAdded: false,
  citiesReceived: false,
  cities: null,
  companiesReceived: false,
  companies: null,
  flightsReceived: false,
  flights: null,
});

const addReducer = (state = initialState, action) => {
  switch (action.type) {
    case TICKETS_ADD_SUCCEEDED:
      return state.set('ticketAdded', true).set('ticketAddError', false);
    case TICKETS_ADD_FAILED:
      return state.set('ticketAdded', false).set('ticketAddError', true);
    case CITIES_SUCCESS:
      return state.set('citiesReceived', true).set('cities', action.payload);
    case CITIES_ERROR:
      return state.set('citiesReceived', false).set('cities', null);
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
      return state.set('locationAdded', true).set('locationAddError', false);
    case LOCATION_ADD_FAILED:
      return state.set('locationAdded', false).set('locationAddError', true);
    case DISCARD_STATE:
      return initialState;
    default:
      return state;
  }
};

export default addReducer;
