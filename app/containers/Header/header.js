import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import Toggle from '../../components/basic/toggleButton';
import Title from '../../components/basic/title';
import Button from '../../components/basic/button';
import SocialIcon from '../../components/basic/socialicon';
import {
  makeSelectIsModalVisible,
  makeSelectIsAuthorized,
  makeSelectUser,
  makeSelectIsAdmin,
} from '../App/selectors/globalSelectors';
import messages from './messages';
import { CHANGE_LOCALE } from '../LanguageProvider/constants';
import { makeSelectLocale } from '../LanguageProvider/selectors';

class Header extends React.PureComponent {
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
    const adminButton = isAdmin
      ? [
        <Link to="/add">
          <SocialIcon icon="fa fa-plus" />
        </Link>
      ]
      : null;
    const headerOptions = isAuthorized
      ? [
        <div className="header__options">
          <Link to="/user/tickets">
            <SocialIcon icon="fa fa-user" />
          </Link>
          {adminButton}
          <Link to="/user/basket">
            <SocialIcon icon="fa fa-shopping-cart" />
          </Link>
          <Toggle value={nextLang} callback={this.handle} />
          {/* <Button
            text={<FormattedMessage {...messages.enter} />}
            onClick={this.props.showSignIn}
          /> */}
        </div>,
      ]
      : [
        <div className="header__options">
          <Toggle value={nextLang} callback={this.handle} />
          <Button
            text={<FormattedMessage {...messages.enter} />}
            onClick={this.props.showSignIn}
          />
        </div>,
      ];

    return (
      <header className="container-flex header">
        <div className="content-flex header__content">
          <Link to="/">
            <Title style="base-title site-name" text="Airlines" />
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
  language: PropTypes.string,
  isAuthorized: PropTypes.bool,
  isAdmin: PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
  return {
    showSignIn() {
      dispatch({
        type: 'SHOW_SIGN_MODAL',
        payload: true,
      });
    },

    changeLang(lang) {
      const nextLang = lang === 'ru' ? 'en' : 'ru';
      dispatch({
        type: CHANGE_LOCALE,
        locale: nextLang,
      });
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
