import { fromJS } from 'immutable';

const initialState = fromJS({
  modalVisible: false
});

const authReducer = function(state = initialState, action) {
  switch(action.type) {
    case 'SHOW_SIGN_MODAL':
      return Object.assign({}, state, {
        modalVisible: action.payload,
      });
  }
  return state;
}

export default authReducer;
