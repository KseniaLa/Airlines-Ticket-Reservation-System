import { SHOW_TICKETS, SHOW_CART } from './constants';

export function setTicketsPageShown() {
  return {
    type: SHOW_TICKETS,
  };
}

export function setCartPageShown() {
  return {
    type: SHOW_CART,
  };
}
