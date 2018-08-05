import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Toggle from '../basic/ToggleButton';
import Title from '../basic/Title';
import Button from '../basic/Button';
import SocialIcon from '../basic/Icon';
import messages from './messages';
import './style.scss';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeLang = this.handleChangeLang.bind(this);
  }

  handleChangeLang() {
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
          <SocialIcon icon="fa fa-user" />
        </NavLink>
        {adminButton}
        <NavLink to="/user/basket" activeClassName="selected">
          <SocialIcon icon="fa fa-shopping-cart" />
        </NavLink>
        <Toggle value={nextLang} callback={this.handleChangeLang} />
        <Link to="/">
          <Button
            text={<FormattedMessage {...messages.logout} />}
            onClick={this.props.logout}
          />
        </Link>
      </div>
    ) : (
      <div className="header__options">
        <Toggle value={nextLang} callback={this.handleChangeLang} />
        <Button
          text={<FormattedMessage {...messages.enter} />}
          onClick={this.props.onOpenClick}
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
  onOpenClick: PropTypes.func,
  logout: PropTypes.func,
  language: PropTypes.string,
  isAuthorized: PropTypes.bool,
  isAdmin: PropTypes.bool,
};
