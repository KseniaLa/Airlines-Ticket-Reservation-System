import { fromJS } from 'immutable';
import { TRY_LOGIN_SUCCEEDED, TRY_LOGIN_FAILED } from './constants';

const initialState = fromJS({
  loginStateReceived: false,
  loginError: false,
});

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRY_LOGIN_SUCCEEDED:
      return state.set('loginStateReceived', true);
    case TRY_LOGIN_FAILED:
      return state.set('loginError', true);
    default:
      return state;
  }
};

export default loginReducer;
