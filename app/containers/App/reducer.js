import { fromJS } from 'immutable';
import { MODAL_STATE, LOGOUT } from './constants';

const initialState = fromJS({
  modalVisible: false,
  isAuthorized: true, // it should be false, but now it's true to show user buttons
  user: {
    name: 'Unknown',
    id: '',
    isAdmin: true,
  },
});

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_STATE:
      return state.set('modalVisible', action.payload);
    case LOGOUT:
      return state.set('isAuthorized', false);
    default:
      return state;
  }
};

export default authReducer;
