import { fromJS } from 'immutable';
import {
  TICKETS_FETCH_SUCCEEDED,
  TICKETS_FETCH_FAILED,
  DISCARD_DATA_READY,
  ADD_SUCCEEDED,
  ADD_FAILED,
  ADD_TICKET,
} from './constants';

const initialState = fromJS({
  dataReceived: false,
  data: null,
  ticketAddError: false,
});

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case TICKETS_FETCH_SUCCEEDED:
      return state.set('dataReceived', true).set('data', action.payload);
    case TICKETS_FETCH_FAILED:
      return state.set('dataReceived', false);
    case DISCARD_DATA_READY:
      return state.set('dataReceived', false);
    case ADD_TICKET:
      return state.set('ticketAddError', false);
    case ADD_SUCCEEDED:
      return state.set('ticketAddError', false);
    case ADD_FAILED:
      return state.set('ticketAddError', true);
    default:
      return state;
  }
};

export default searchReducer;
