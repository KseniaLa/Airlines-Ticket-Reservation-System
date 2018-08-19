import { fromJS } from 'immutable';
import { TICKETS_ADD_SUCCEEDED, TICKETS_ADD_FAILED } from './constants';

const initialState = fromJS({
  ticketAddError: false,
  ticketAdded: false,
});

const addReducer = (state = initialState, action) => {
  switch (action.type) {
    case TICKETS_ADD_SUCCEEDED:
      return state.set('dataReceived', false);
    case TICKETS_ADD_FAILED:
      return state.set('dataReceived', false);
    default:
      return state;
  }
};

export default addReducer;
