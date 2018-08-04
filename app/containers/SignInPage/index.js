import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import 'font-awesome/css/font-awesome.min.css';

import messages from './messages';

import Button from '../../components/basic/Button';
import Field from '../../components/basic/TextField';
import Title from '../../components/basic/Title';
import './style.scss';
import { makeSelectIsModalVisible } from '../App/selectors';
import { setModalState, login } from '../App/actions';

import { user } from './user.json';

class SignInPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { signIn: true };
    this.handleChangeModeClick = this.handleChangeModeClick.bind(this);
    this.setUserData = this.setUserData.bind(this);
    this.signInPart = (
      <div className="container">
        <form className="sign-page__form" name="signin-form">
          <Title
            className="sign-page__title"
            text={<FormattedMessage {...messages.signintitle} />}
          />
          <FormattedMessage id="app.components.SignInPage.email">
            {placeholder => <Field type="text" hint={placeholder} name="" />}
          </FormattedMessage>
          <FormattedMessage id="app.components.SignInPage.password">
            {placeholder => <Field type="text" hint={placeholder} name="" />}
          </FormattedMessage>
          <Button
            text={<FormattedMessage {...messages.signin} />}
            onClick={this.setUserData}
          />
        </form>

        <div className="change-mode">
          <h6>{<FormattedMessage {...messages.newuser} />}</h6>
          <Button
            text={<FormattedMessage {...messages.signup} />}
            onClick={this.handleChangeModeClick}
          />
        </div>
      </div>
    );

    this.signUpPart = (
      <div className="container">
        <form className="sign-page__form" name="signup-form">
          <Title
            className="sign-page__title"
            text={<FormattedMessage {...messages.signuptitle} />}
          />
          <FormattedMessage id="app.components.SignInPage.name">
            {placeholder => <Field type="text" hint={placeholder} name="" />}
          </FormattedMessage>
          <FormattedMessage id="app.components.SignInPage.surname">
            {placeholder => <Field type="text" hint={placeholder} name="" />}
          </FormattedMessage>
          <FormattedMessage id="app.components.SignInPage.email">
            {placeholder => <Field type="text" hint={placeholder} name="" />}
          </FormattedMessage>
          <Button text={<FormattedMessage {...messages.signup} />} />
        </form>
        <div className="change-mode">
          <h6>{<FormattedMessage {...messages.loginexists} />}</h6>
          <Button
            text={<FormattedMessage {...messages.signin} />}
            onClick={this.handleChangeModeClick}
          />
        </div>
      </div>
    );
  }

  setUserData(e) {
    e.preventDefault();
    const { name, surname, isAdmin } = user;
    this.props.login(name, surname, isAdmin);
    this.props.onCloseClick();
  }

  handleChangeModeClick() {
    const sign = this.state.signIn;
    this.setState({ signIn: !sign });
  }

  render() {
    let mainPart;
    if (this.state.signIn) {
      mainPart = this.signInPart;
    } else {
      mainPart = this.signUpPart;
    }

    return (
      <section className="sign-page">
        <button className="close-button" onClick={this.props.onCloseClick}>
          <i className="fa fa-times" />
        </button>
        {mainPart}
      </section>
    );
  }
}

SignInPage.propTypes = {
  hideSignIn: PropTypes.func,
  onCloseClick: PropTypes.func,
  login: PropTypes.func,
  visible: PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
  return {
    hideSignIn() {
      dispatch(setModalState(false));
    },
    login(name, surname, isAdmin) {
      dispatch(login(name, surname, isAdmin));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  visible: makeSelectIsModalVisible(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignInPage);
