import { fromJS } from 'immutable';
import { SHOW_TICKETS, SHOW_CART } from './constants';

const initialState = fromJS({
  userTicketsAreShown: true,
  userCartIsShown: false,
});

const userPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_TICKETS:
      return state
        .set('userTicketsAreShown', true)
        .set('userCartIsShown', false);
    case SHOW_CART:
      return state
        .set('userTicketsAreShown', false)
        .set('userCartIsShown', true);
    default:
      return state;
  }
};

export default userPageReducer;
