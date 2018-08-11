import { fromJS } from 'immutable';
import { LOGOUT, SIGN_IN } from './constants';

const initialState = fromJS({
  isAuthorized: false,
  user: {
    name: 'Unknown',
    id: '',
    isAdmin: false,
  },
  authorizationInfo: {
    access_token: false,
  },
});

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      return state
        .set('isAuthorized', false)
        .setIn(['user', 'name'], 'Unknown')
        .setIn(['user', 'isAdmin'], false);
    case SIGN_IN:
      return state
        .setIn(['user', 'name'], `${action.userName} ${action.userSurname}`)
        .setIn(['user', 'isAdmin'], action.isadmin)
        .setIn(['authorizationInfo', 'access_token'], action.access_token)
        .set('isAuthorized', true);
    default:
      return state;
  }
};

export default authReducer;
