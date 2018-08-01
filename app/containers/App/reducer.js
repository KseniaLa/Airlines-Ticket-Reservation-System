import { fromJS } from 'immutable';
import { MODAL_STATE, LOGOUT, SIGN_IN } from './constants';

const initialState = fromJS({
  modalVisible: false,
  isAuthorized: false,
  user: {
    name: 'Unknown',
    id: '',
    isAdmin: false,
  },
});

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_STATE:
      return state.set('modalVisible', action.payload);
    case LOGOUT:
      return state
        .set('isAuthorized', false)
        .setIn(['user', 'name'], 'Unknown')
        .setIn(['user', 'isAdmin'], false);
    case SIGN_IN:
      return state
        .setIn(['user', 'name'], action.payload)
        .setIn(['user', 'isAdmin'], action.isadmin)
        .set('isAuthorized', true);
    default:
      return state;
  }
};

export default authReducer;
