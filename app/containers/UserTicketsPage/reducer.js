import { fromJS } from 'immutable';
import {
  USER_TICKETS_FETCH_SUCCEEDED,
  USER_TICKETS_FETCH_FAILED,
} from './constants';

const initialState = fromJS({
  dataReceived: false,
  data: null,
});

const userTicketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_TICKETS_FETCH_SUCCEEDED:
      return state.set('dataReceived', true).set('data', action.payload);
    case USER_TICKETS_FETCH_FAILED:
      return state.set('dataReceived', false);
    default:
      return state;
  }
};

export default userTicketsReducer;
