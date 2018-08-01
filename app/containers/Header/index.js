import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import Toggle from '../../components/basic/ToggleButton';
import Title from '../../components/basic/Title';
import Button from '../../components/basic/Button';
import SocialIcon from '../../components/basic/Icon';
import messages from './messages';
import './style.scss';
import {
  makeSelectIsModalVisible,
  makeSelectIsAuthorized,
  makeSelectUser,
  makeSelectIsAdmin,
} from '../App/selectors';
import { setModalState, logout } from '../App/actions';
import { changeLocale } from '../LanguageProvider/actions';
import { setTicketsPageShown, setCartPageShown } from '../UserPage/actions';

import { makeSelectLocale } from '../LanguageProvider/selectors';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handle = this.handle.bind(this);
  }

  handle() {
    this.props.changeLang(this.props.language);
  }

  render() {
    const lang = this.props.language;
    const nextLang = lang === 'ru' ? 'en' : 'ru';
    const { isAuthorized } = this.props;
    const { isAdmin } = this.props;
    const adminButton = isAdmin ? (
      <NavLink to="/add" activeClassName="selected">
        <SocialIcon icon="fa fa-plus" />
      </NavLink>
    ) : null;
    const headerOptions = isAuthorized ? (
      <div className="header__options">
        <NavLink to="/user/tickets" activeClassName="selected">
          <SocialIcon icon="fa fa-user" onClick={this.props.showTicketsPage} />
        </NavLink>
        {adminButton}
        <NavLink to="/user/basket" activeClassName="selected">
          <SocialIcon
            icon="fa fa-shopping-cart"
            onClick={this.props.showCartPage}
          />
        </NavLink>
        <Toggle value={nextLang} callback={this.handle} />
        <Link to="/">
          <Button
            text={<FormattedMessage {...messages.logout} />}
            onClick={this.props.logout}
          />
        </Link>
      </div>
    ) : (
      <div className="header__options">
        <Toggle value={nextLang} callback={this.handle} />
        <Button
          text={<FormattedMessage {...messages.enter} />}
          onClick={this.props.showSignIn}
        />
      </div>
    );

    return (
      <header className="container-flex header">
        <div className="content-flex header__content">
          <Link to="/">
            <Title
              className="base-title site-name"
              text={<FormattedMessage {...messages.title} />}
            />
          </Link>
          {headerOptions}
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  changeLang: PropTypes.func,
  showSignIn: PropTypes.func,
  logout: PropTypes.func,
  showTicketsPage: PropTypes.func,
  showCartPage: PropTypes.func,
  language: PropTypes.string,
  isAuthorized: PropTypes.bool,
  isAdmin: PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
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
)(Header);
