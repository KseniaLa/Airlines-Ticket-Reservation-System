import { fromJS } from 'immutable';
import { TICKETS_FETCH_SUCCEEDED, TICKETS_FETCH_FAILED } from './constants';

const initialState = fromJS({
  dataReceived: false,
  data: null,
});

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case TICKETS_FETCH_SUCCEEDED:
      return state.set('dataReceived', true).set('data', action.payload);
    case TICKETS_FETCH_FAILED:
      return state.set('dataReceived', false);
    default:
      return state;
  }
};

export default cartReducer;
