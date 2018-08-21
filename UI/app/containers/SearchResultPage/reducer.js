import { fromJS } from 'immutable';
import {
  TICKETS_FETCH_SUCCEEDED,
  TICKETS_FETCH_FAILED,
  DISCARD_DATA_READY,
  ADD_SUCCEEDED,
  ADD_FAILED,
  ADD_TICKET,
  DISCARD_ADD_STATE,
} from './constants';

const initialState = fromJS({
  dataReceived: false,
  data: null,
  count: 0,
  ticketAddError: false,
  ticketAdded: false,
});

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case TICKETS_FETCH_SUCCEEDED:
      return state
        .set('dataReceived', true)
        .set('data', action.payload.tickets)
        .set('count', action.payload.count);
    case TICKETS_FETCH_FAILED:
      return state.set('dataReceived', false);
    case DISCARD_DATA_READY:
      return state.set('dataReceived', false);
    case ADD_TICKET:
      return state.set('ticketAddError', false);
    case ADD_SUCCEEDED:
      return state.set('ticketAddError', false).set('ticketAdded', true);
    case ADD_FAILED:
      return state.set('ticketAddError', true).set('ticketAdded', false);
    case DISCARD_ADD_STATE:
      return state.set('ticketAddError', false).set('ticketAdded', false);
    default:
      return state;
  }
};

export default searchReducer;
