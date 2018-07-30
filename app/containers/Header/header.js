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
import { makeSelectIsModalVisible } from '../App/selectors/globalSelectors';
import messages from './messages';
import { CHANGE_LOCALE } from '../LanguageProvider/constants';
import { makeSelectLocale } from '../LanguageProvider/selectors';
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';

class Header extends React.PureComponent {

  render() {
    return (
      <header className="container-flex header">
        <div className="content-flex header__content">
          <Link to="/">
            <Title style="base-title site-name" text="Airlines" />
          </Link>
          <div className="header__options">
            <Link to="/user/tickets">
              <SocialIcon icon="fa fa-user" />
            </Link>
            <Link to="/add">
              <SocialIcon icon="fa fa-plus" />
            </Link>
            <Link to="/user/basket">
              <SocialIcon icon="fa fa-shopping-cart" />
            </Link>
            <Toggle on="EN" off="RU" callback={this.props.changeLang.bind(this, this.props.language)} />
            <Button
              text={<FormattedMessage {...messages.enter} />}
              onClick={this.props.showSignIn}
            />
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  changeLang: PropTypes.func,
  showSignIn: PropTypes.func,
  language: PropTypes.string,
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
