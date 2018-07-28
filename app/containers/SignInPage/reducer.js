const initialState = {
  modalVisible: false
};

const signReducer = function(state = initialState, action) {
  switch(action.type) {
    case 'SHOW_SIGN_MODAL':
      return Object.assign({}, state, {
        modalVisible: action.modalVisible,
      });
  }
  return state;
}

export default signReducer;
