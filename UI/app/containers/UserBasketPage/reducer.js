import { fromJS } from 'immutable';
import {
  TICKETS_FETCH_SUCCEEDED,
  TICKETS_FETCH_FAILED,
  ORDER_SUCCEEDED,
  ORDER_FAILED,
  DISCARD_STATE,
  TICKET_DELETED,
  DISCARD_ORDER,
} from './constants';

const initialState = fromJS({
  dataReceived: false,
  data: null,
  cartSubmitted: false,
  orderError: false,
  deletionOccured: false,
});

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case TICKETS_FETCH_SUCCEEDED:
      return state.set('dataReceived', true).set('data', action.payload);
    case TICKETS_FETCH_FAILED:
      return state.set('dataReceived', false);
    case ORDER_SUCCEEDED:
      return state.set('cartSubmitted', true);
    case ORDER_FAILED:
      return state.set('cartSubmitted', false).set('orderError', true);
    case DISCARD_STATE:
      return state
        .set('dataReceived', false)
        .set('data', null)
        .set('cartSubmitted', false)
        .set('orderError', false)
        .set('deletionOccured', false);
    case DISCARD_ORDER:
      return state.set('cartSubmitted', false).set('orderError', false);
    case TICKET_DELETED:
      return state.set('deletionOccured', action.payload);
    default:
      return state;
  }
};

export default cartReducer;
