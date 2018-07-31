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

import 'font-awesome/css/font-awesome.min.css';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage/index';
import SearchResultPage from '../SearchResultPage/index';
import AddPage from '../AddPage/index';
import Header from '../Header/header';
import Footer from '../../components/Footer/footer';
import SignIn from '../SignInPage/index';
import UserPage from '../UserPage/index';


import './style.scss';

export default class App extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <div className="content">
          <Header/>
          <SignIn />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/results" component={SearchResultPage} />
            <Route path="/user" component={UserPage} />
            <Route exact path="/add" component={AddPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

/*export function mapDispatchToProps(dispatch) {
  return {
    showSignIn() {
      dispatch(setModalState(true));
    },

    changeLang(lang) {
      const nextLang = lang === 'ru' ? 'en' : 'ru';
      dispatch(changeLocale(nextLang));
    },

    logout() {
      dispatch(logout());
    },

    showTicketsPage() {
      dispatch(setTicketsPageShown());
    },

    showCartPage() {
      dispatch(setCartPageShown());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  visible: makeSelectIsModalVisible(),
  language: makeSelectLocale(),
  isAuthorized: makeSelectIsAuthorized(),
  isAdmin: makeSelectIsAdmin(),
  user: makeSelectUser(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);*/
