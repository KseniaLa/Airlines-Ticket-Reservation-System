import React from 'react';
import ReactModal from 'react-modal';
import Popup from 'react-popup';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import 'font-awesome/css/font-awesome.min.css';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage/index';
import { config } from '../../utils/configLoader';
import SearchResultPage from '../SearchResultPage';
import AddPage from '../AddPage';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SignIn from '../SignInPage';
import UserPage from '../UserPage';
import ConfirmedPage from '../ConfirmedPage';
import {
  makeSelectIsAuthorized,
  makeSelectIsAdmin,
  makeSelectRestore,
} from './selectors';
import { logout, setSearch, tryLogin } from './actions';
import { discardDataReady } from '../SearchResultPage/actions';
import { changeLocale } from '../LanguageProvider/actions';
import { makeSelectLocale } from '../LanguageProvider/selectors';
import { discardLogin } from '../SignInPage/actions';

import './style.scss';

ReactModal.setAppElement('#app');

Popup.registerPlugin('errorPopup', function on(content) {
  this.create({
    title: (
      <div className="error">
        <i className="fa fa-times" />
      </div>
    ),
    content,
    className: 'error',
  });
});

Popup.registerPlugin('successPopup', function on(content) {
  this.create({
    title: (
      <div className="success">
        <i className="fa fa-check" />
      </div>
    ),
    content,
    className: 'success',
  });
});

Popup.registerPlugin('locationPopup', function on(title, content) {
  this.create({
    title,
    content,
  });
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    this.props.onTryLogin();
  }

  componentDidUpdate() {
    if (this.props.restore) {
      this.handleOpenModal();
    }
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div className="wrapper">
        <div className="content">
          <Popup wildClasses className="popup" />
          <Header
            language={this.props.language}
            isAuthorized={this.props.isAuthorized}
            isAdmin={this.props.isAdmin}
            onOpenClick={this.handleOpenModal}
            changeLang={this.props.changeLang}
            logout={this.props.logout}
          />
          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="signIn modal"
            onRequestClose={this.handleCloseModal}
            className="sign-modal"
            overlayClassName="overlay"
          >
            <SignIn onCloseClick={this.handleCloseModal} />
          </ReactModal>

          <Switch>
            <Route
              exact
              path="/"
              render={() => <HomePage onSearch={this.props.getTickets} />}
            />
            <Route
              exact
              path="/results"
              render={() => (
                <SearchResultPage
                  onNotAuth={this.handleOpenModal}
                  onSearch={this.props.getTickets}
                />
              )}
            />
            <Route path="/confirm" component={ConfirmedPage} />
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

App.propTypes = {
  changeLang: PropTypes.func,
  logout: PropTypes.func,
  getTickets: PropTypes.func,
  onTryLogin: PropTypes.func,
  language: PropTypes.string,
  isAuthorized: PropTypes.bool,
  isAdmin: PropTypes.bool,
  restore: PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
  return {
    changeLang(lang) {
      const nextLang =
        lang === config.defaultLanguage
          ? config.availableLanguages[1]
          : config.availableLanguages[0];
      dispatch(changeLocale(nextLang));
    },

    onTryLogin() {
      dispatch(tryLogin());
    },

    logout() {
      dispatch(logout());
      dispatch(discardLogin());
    },

    getTickets(from, to, date, flightClass) {
      dispatch(discardDataReady());
      dispatch(setSearch(from, to, date, flightClass));
      // dispatch(searchForTickets(from, to, date, flightClass, lang));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  language: makeSelectLocale(),
  isAuthorized: makeSelectIsAuthorized(),
  isAdmin: makeSelectIsAdmin(),
  restore: makeSelectRestore(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false },
)(App);
