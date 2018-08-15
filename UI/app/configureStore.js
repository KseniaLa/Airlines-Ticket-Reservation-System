/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
import {
  ticketsResultSaga,
  addTicketSaga,
} from './containers/SearchResultPage/saga';
import { citiesSaga } from './containers/HomePage/saga';
import { userTicketsSaga } from './containers/UserTicketsPage/saga';
import { tryLoginSaga, trySignUpSaga } from './containers/SignInPage/saga';
import { cartSaga } from './containers/UserBasketPage/saga';
import { historySaga } from './containers/UserPage/saga';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}, history) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const enhancers = [applyMiddleware(...middlewares)];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle, indent */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          shouldHotReload: false,
        })
      : compose;
  /* eslint-enable */

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers),
  );

  // Extensions
  sagaMiddleware.run(ticketsResultSaga);
  sagaMiddleware.run(addTicketSaga);
  sagaMiddleware.run(citiesSaga);
  sagaMiddleware.run(userTicketsSaga);
  sagaMiddleware.run(tryLoginSaga);
  sagaMiddleware.run(trySignUpSaga);
  sagaMiddleware.run(cartSaga);
  sagaMiddleware.run(historySaga);
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
}
