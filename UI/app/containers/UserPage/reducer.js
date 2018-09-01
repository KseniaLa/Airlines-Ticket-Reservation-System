import { fromJS } from 'immutable';
import { HISTORY_FETCH_SUCCEEDED, HISTORY_FETCH_FAILED } from './constants';

const initialState = fromJS({
  ipDataReady: false,
  ipData: null,
});

const userPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case HISTORY_FETCH_SUCCEEDED:
      return state.set('ipDataReady', true).set('ipData', action.payload);
    case HISTORY_FETCH_FAILED:
      return state.set('ipDataReady', false);
    default:
      return state;
  }
};

export default userPageReducer;
