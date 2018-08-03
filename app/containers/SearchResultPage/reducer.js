import { fromJS } from 'immutable';
import { TICKETS_FETCH_SUCCEEDED, TICKETS_FETCH_FAILED } from './constants';

const initialState = fromJS({
  searchTickets: null,
});

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case TICKETS_FETCH_SUCCEEDED:
      return state.set('searchTickets', action.payload);
    case TICKETS_FETCH_FAILED:
      return state.set('searchTickets', null);
    default:
      return state;
  }
};

export default searchReducer;
