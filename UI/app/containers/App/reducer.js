import { fromJS } from 'immutable';
import { LOGOUT, SIGN_IN, SET_SEARCH, RESTORE } from './constants';

const initialState = fromJS({
  isAuthorized: false,
  restore: false,
  user: {
    name: 'Unknown',
    id: '',
    isAdmin: false,
  },
  authorizationInfo: {
    access_token: false,
  },
  search: {
    from: '',
    to: '',
    date: null,
    flightClass: '',
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
        .set('isAuthorized', true)
        .set('restore', false);
    case SET_SEARCH:
      return state
        .setIn(['search', 'from'], action.from)
        .setIn(['search', 'to'], action.to)
        .setIn(['search', 'date'], action.date)
        .setIn(['search', 'flightClass'], action.flightClass);
    case RESTORE:
      return state.set('isAuthorized', false).set('restore', true);
    default:
      return state;
  }
};

export default authReducer;
