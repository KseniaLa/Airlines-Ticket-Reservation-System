import { fromJS } from 'immutable';
import {
  TICKETS_FETCH_SUCCEEDED,
  TICKETS_FETCH_FAILED,
  ORDER_SUCCEEDED,
  DISCARD_ORDER_SUCCEEDED,
} from './constants';

const initialState = fromJS({
  dataReceived: false,
  data: null,
  cartSubmitted: false,
});

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case TICKETS_FETCH_SUCCEEDED:
      return state.set('dataReceived', true).set('data', action.payload);
    case TICKETS_FETCH_FAILED:
      return state.set('dataReceived', false);
    case ORDER_SUCCEEDED:
      return state.set('cartSubmitted', true);
    case DISCARD_ORDER_SUCCEEDED:
      return state.set('cartSubmitted', false);
    default:
      return state;
  }
};

export default cartReducer;
