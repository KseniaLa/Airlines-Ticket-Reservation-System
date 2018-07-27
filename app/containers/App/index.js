/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route, ReactRouter, Router } from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from 'containers/HomePage/index';
import SearchResultPage from '../SearchResultPage/index';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from '../Header/header';
import Footer from '../footer';
import SignInPage from '../SignInPage';
import SignIn from '../SignInPage/index';
import UserPage from '../UserPage/index';
import 'font-awesome/css/font-awesome.min.css';

//let browserHistory = ReactRouter.browserHistory;

/*export default*/ class App extends React.Component {
  render() {
    return (
      <div className='wrapper'>
      <div className='content'>
        <Header />
        {/*<SignIn />*/}
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/results" component={SearchResultPage} />
          <Route exact path="/user" component={UserPage} />
          <Route component={NotFoundPage} />
        </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(
  state => ({
    testStore: state
  }),
  dispatch => ({})
)(App);

