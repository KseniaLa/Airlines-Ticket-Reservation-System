import { fromJS } from 'immutable';
import {
  TRY_LOGIN_SUCCEEDED,
  TRY_LOGIN_FAILED,
  DISCARD_LOGIN_INFO,
} from './constants';

const initialState = fromJS({
  loginStateReceived: false,
  loginError: false,
});

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRY_LOGIN_SUCCEEDED:
      return state.set('loginStateReceived', true);
    case DISCARD_LOGIN_INFO:
      return state.set('loginStateReceived', false);
    case TRY_LOGIN_FAILED:
      return state.set('loginError', true);
    default:
      return state;
  }
};

export default loginReducer;
