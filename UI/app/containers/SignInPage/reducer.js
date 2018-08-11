import { fromJS } from 'immutable';
import {
  TRY_LOGIN_SUCCEEDED,
  TRY_LOGIN_FAILED,
  DISCARD_LOGIN_INFO,
  TRY_SIGNUP_SUCCEEDED,
  TRY_SIGNUP_FAILED,
  USER_REGISTERED,
  DISCARD_USER_REGISTERED,
} from './constants';

const initialState = fromJS({
  loginStateReceived: false,
  loginError: false,
  signupStateReceived: false,
  signupError: false,
  registered: false,
});

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRY_LOGIN_SUCCEEDED:
      return state.set('loginStateReceived', true);
    case DISCARD_LOGIN_INFO:
      return state.set('loginStateReceived', false);
    case TRY_LOGIN_FAILED:
      return state.set('loginError', true);
    case TRY_SIGNUP_SUCCEEDED:
      return state.set('signupStateReceived', true);
    case TRY_SIGNUP_FAILED:
      return state.set('signupError', true);
    case USER_REGISTERED:
      return state.set('registered', true);
    case DISCARD_USER_REGISTERED:
      return state.set('registered', false);
    default:
      return state;
  }
};

export default loginReducer;
