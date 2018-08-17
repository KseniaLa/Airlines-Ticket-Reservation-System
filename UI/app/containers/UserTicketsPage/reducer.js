import { fromJS } from 'immutable';
import {
  USER_TICKETS_FETCH_SUCCEEDED,
  USER_TICKETS_FETCH_FAILED,
  CANCEL_TICKET_SUCCEEDED,
  CANCEL_TICKET_FAILED,
  DISCARD_CANCEL_STATE,
} from './constants';

const initialState = fromJS({
  dataReceived: false,
  data: null,
  cancelled: false,
  cancelError: false,
});

const userTicketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_TICKETS_FETCH_SUCCEEDED:
      return state.set('dataReceived', true).set('data', action.payload);
    case USER_TICKETS_FETCH_FAILED:
      return state.set('dataReceived', false);
    case CANCEL_TICKET_SUCCEEDED:
      return state.set('cancelled', true).set('cancelError', false);
    case CANCEL_TICKET_FAILED:
      return state.set('cancelled', false).set('cancelError', true);
    case DISCARD_CANCEL_STATE:
      return state.set('cancelled', false).set('cancelError', false);
    default:
      return state;
  }
};

export default userTicketsReducer;
