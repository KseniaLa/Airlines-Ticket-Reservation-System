import { fromJS } from 'immutable';
import {
  CITIES_FETCH_SUCCEEDED,
  CITIES_FETCH_FAILED,
  RESET_CITIES,
} from './constants';

const initialState = fromJS({
  dataReceived: false,
  data: null,
});

const citiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CITIES_FETCH_SUCCEEDED:
      return state.set('dataReceived', true).set('data', action.payload);
    case CITIES_FETCH_FAILED:
      return state.set('dataReceived', false);
    case RESET_CITIES:
      return initialState;
    default:
      return state;
  }
};

export default citiesReducer;
