import { fromJS } from 'immutable';
import { CONFIRMATION_SUCCEEDED, CONFIRMATION_FAILED } from './constants';

const initialState = fromJS({
  confirmed: false,
  confirmationError: false,
});

const confirmationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONFIRMATION_SUCCEEDED:
      return state.set('confirmed', true).set('confirmationError', false);
    case CONFIRMATION_FAILED:
      return state.set('confirmed', false).set('confirmationError', true);
    default:
      return state;
  }
};

export default confirmationReducer;
