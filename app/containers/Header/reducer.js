const initialState = {
  modalVisible: false
};

const headerReducer = function(state = initialState, action) {
  switch(action.type) {
    case 'SHOW_SIGN_MODAL':
      return Object.assign({}, state, {
        modalVisible: action.modalVisible,
      });
  }
  return state;
}

export default headerReducer;
