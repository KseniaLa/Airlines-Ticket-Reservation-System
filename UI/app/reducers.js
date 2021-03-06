/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import languageProviderReducer from 'containers/LanguageProvider/reducer';
import globalReducer from 'containers/App/reducer';
import userPageReducer from 'containers/UserPage/reducer';
import searchReducer from 'containers/SearchResultPage/reducer';
import citiesReducer from 'containers/HomePage/reducer';
import userTicketsReducer from 'containers/UserTicketsPage/reducer';
import loginReducer from 'containers/SignInPage/reducer';
import cartReducer from 'containers/UserBasketPage/reducer';
import addReducer from 'containers/AddPage/reducer';
import confirmationReducer from 'containers/ConfirmedPage/reducer';
/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  location: null,
});

/**
 * Merge route into the global application state
 */
export function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        location: action.payload,
      });
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
  return combineReducers({
    route: routeReducer,
    language: languageProviderReducer,
    global: globalReducer,
    userPage: userPageReducer,
    confirmation: confirmationReducer,
    searchResult: searchReducer,
    citiesResult: citiesReducer,
    userTickets: userTicketsReducer,
    loginResult: loginReducer,
    cartResult: cartReducer,
    addResult: addReducer,
    ...injectedReducers,
  });
}
