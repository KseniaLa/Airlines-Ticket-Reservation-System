/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
export const LOGOUT = 'airlines/App/LOGOUT';
export const SIGN_IN = 'airlines/App/SIGN_IN';
export const SET_SEARCH = 'airlines/App/SET_SERCH';
export const RESTORE = 'airlines/App/RESTORE';
