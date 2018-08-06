import React from 'react';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import 'font-awesome/css/font-awesome.min.css';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage/index';
import SearchResultPage from '../SearchResultPage';
import AddPage from '../AddPage';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SignIn from '../SignInPage';
import UserPage from '../UserPage';
import { makeSelectIsAuthorized, makeSelectIsAdmin } from './selectors';
import { logout } from './actions';
import {
  searchForTickets,
  discardDataReady,
} from '../SearchResultPage/actions';
import { changeLocale } from '../LanguageProvider/actions';
import { makeSelectLocale } from '../LanguageProvider/selectors';
import { discardLogin } from '../SignInPage/actions';

import './style.scss';

ReactModal.setAppElement('#app');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
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
            className="modal"
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
  language: PropTypes.string,
  isAuthorized: PropTypes.bool,
  isAdmin: PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
  return {
    changeLang(lang) {
      const nextLang = lang === 'ru' ? 'en' : 'ru';
      dispatch(changeLocale(nextLang));
    },

    logout() {
      dispatch(logout());
      dispatch(discardLogin());
    },

    getTickets(search) {
      dispatch(discardDataReady());
      dispatch(searchForTickets(search));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  language: makeSelectLocale(),
  isAuthorized: makeSelectIsAuthorized(),
  isAdmin: makeSelectIsAdmin(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false },
)(App);
