import { fromJS } from 'immutable';
import {
  TICKETS_ADD_SUCCEEDED,
  TICKETS_ADD_FAILED,
  CITIES_SUCCESS,
  CITIES_ERROR,
  COMPANIES_SUCCESS,
  COMPANIES_ERROR,
  DISCARD_STATE,
} from './constants';

const initialState = fromJS({
  ticketAddError: false,
  ticketAdded: false,
  citiesReceived: false,
  cities: null,
  companiesReceived: false,
  companies: null,
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
    case COMPANIES_SUCCESS:
      return state
        .set('companiesReceived', true)
        .set('companies', action.payload);
    case COMPANIES_ERROR:
      return state.set('companiesReceived', false).set('companies', null);
    case DISCARD_STATE:
      return initialState;
    default:
      return state;
  }
};

export default addReducer;
