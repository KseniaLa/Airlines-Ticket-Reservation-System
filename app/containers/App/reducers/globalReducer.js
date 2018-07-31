import { fromJS } from 'immutable';

const initialState = fromJS({
  modalVisible: false,
  isAuthorized: false, // it should be false, but now it's true to show user buttons
  user: {
    name: 'Unknown',
    id: '',
    isAdmin: true,
  },
});

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_SIGN_MODAL':
      return state.set('modalVisible', action.payload);
    default:
      return state;
  }
};

export default authReducer;
