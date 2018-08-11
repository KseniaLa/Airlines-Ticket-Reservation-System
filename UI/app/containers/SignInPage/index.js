import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import 'font-awesome/css/font-awesome.min.css';
import { createStructuredSelector } from 'reselect';
import messages from './messages';

import Button from '../../components/basic/Button';
import Field from '../../components/basic/TextField';
import Title from '../../components/basic/Title';
import ErrorMessage from '../../components/basic/ErrorMessage';
import SuccessMessage from '../../components/basic/SuccessMessage';
import {
  tryLogin,
  trySignUp,
  discardRegistered,
  discardLogin,
} from './actions';
import {
  makeSelectIsLoginStateReceived,
  makeSelectIsLoginError,
  makeSelectIsRegistered,
  makeSelectIsSigninStateReceived,
} from './selectors';
import { makeSelectIsAuthorized } from '../App/selectors';
import './style.scss';

class SignInPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      signIn: true,
      signInEmail: '',
      signInPassword: '',
      signUpName: '',
      signUpSurname: '',
      signUpEmail: '',
      signUpPassword: '',
      isSignInInputError: false,
      isSignUpInputError: false,
      shortPassword: false,
    };
    this.handleChangeModeClick = this.handleChangeModeClick.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.updateSignInEmailField = this.updateSignInEmailField.bind(this);
    this.updateSignInPasswordField = this.updateSignInPasswordField.bind(this);
    this.updateSignUpEmailField = this.updateSignUpEmailField.bind(this);
    this.updateSignUpPasswordField = this.updateSignUpPasswordField.bind(this);
    this.updateNameField = this.updateNameField.bind(this);
    this.updateSurnameField = this.updateSurnameField.bind(this);
  }

  componentDidUpdate() {
    if (this.props.loginStateReceived && this.props.isAuthorized) {
      this.props.onCloseClick();
    }
  }

  onSignIn(e) {
    e.preventDefault();
    const { signInEmail, signInPassword } = this.state;
    if (signInEmail !== '' && signInPassword !== '') {
      this.setState({ isSignInInputError: false });
      this.props.tryLogin(signInEmail, signInPassword);
    } else {
      this.setState({ isSignInInputError: true });
    }
  }

  onSignUp(e) {
    const minPassLength = 8;
    e.preventDefault();
    const {
      signUpName,
      signUpSurname,
      signUpEmail,
      signUpPassword,
    } = this.state;
    if (
      signUpName !== '' &&
      signUpSurname !== '' &&
      signUpEmail !== '' &&
      signUpPassword !== ''
    ) {
      this.setState({ isSignUpInputError: false });
      if (signUpPassword.length <= minPassLength) {
        this.setState({ shortPassword: true });
        return;
      }
      this.setState({ shortPassword: false });
      this.props.trySignUp(
        signUpName,
        signUpSurname,
        signUpEmail,
        signUpPassword,
      );
    } else {
      this.setState({ isSignUpInputError: true });
    }
  }

  componentWillUnmount() {
    this.props.discardRegisteredState();
    this.props.discardLoginState();
  }

  handleChangeModeClick() {
    const sign = this.state.signIn;
    this.setState({ signIn: !sign });
    this.props.discardRegisteredState();
    this.props.discardLoginState();
    this.setState({ isSignInInputError: false });
    this.setState({ isSignUpInputError: false });
    this.setState({ shortPassword: false });
  }

  updateSignInEmailField(e) {
    this.setState({ signInEmail: e.target.value });
  }

  updateSignInPasswordField(e) {
    this.setState({ signInPassword: e.target.value });
  }

  updateSignUpEmailField(e) {
    this.setState({ signUpEmail: e.target.value });
  }

  updateSignUpPasswordField(e) {
    this.setState({ signUpPassword: e.target.value });
  }

  updateNameField(e) {
    this.setState({ signUpName: e.target.value });
  }

  updateSurnameField(e) {
    this.setState({ signUpSurname: e.target.value });
  }

  render() {
    const { loginStateReceived, isAuthorized, isLoginError } = this.props;
    const isLoginPasswordInvalid =
      loginStateReceived && !isAuthorized && !this.state.isInputError;
    const signInPart = (
      <div className="container">
        <form className="sign-page__form" name="signin-form">
          <Title
            className="sign-page__title"
            text={<FormattedMessage {...messages.signintitle} />}
          />
          {this.state.isSignInInputError && (
            <ErrorMessage
              text={<FormattedMessage {...messages.invalidinput} />}
            />
          )}
          {isLoginPasswordInvalid && (
            <ErrorMessage
              text={<FormattedMessage {...messages.invalidemailpassword} />}
            />
          )}
          {isLoginError && (
            <ErrorMessage text={<FormattedMessage {...messages.autherror} />} />
          )}
          <FormattedMessage id="app.components.SignInPage.email">
            {placeholder => (
              <Field
                type="text"
                hint={placeholder}
                name=""
                onUpdate={this.updateSignInEmailField}
                isError
              />
            )}
          </FormattedMessage>
          <FormattedMessage id="app.components.SignInPage.password">
            {placeholder => (
              <Field
                type="password"
                hint={placeholder}
                name=""
                onUpdate={this.updateSignInPasswordField}
                isError={this.state.isInputError}
              />
            )}
          </FormattedMessage>
          <Button
            text={<FormattedMessage {...messages.signin} />}
            onClick={this.onSignIn}
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

    const signUpPart = (
      <div className="container">
        <form className="sign-page__form" name="signup-form">
          <Title
            className="sign-page__title"
            text={<FormattedMessage {...messages.signuptitle} />}
          />
          {this.props.isRegistered && (
            <SuccessMessage
              text={<FormattedMessage {...messages.signupsuccess} />}
            />
          )}
          {this.state.isSignUpInputError && (
            <ErrorMessage
              text={<FormattedMessage {...messages.invalidinput} />}
            />
          )}
          {this.state.shortPassword && (
            <ErrorMessage
              text={<FormattedMessage {...messages.shortpassword} />}
            />
          )}
          <FormattedMessage id="app.components.SignInPage.name">
            {placeholder => (
              <Field
                type="text"
                hint={placeholder}
                name=""
                onUpdate={this.updateNameField}
                isError={this.state.isInputError}
              />
            )}
          </FormattedMessage>
          <FormattedMessage id="app.components.SignInPage.surname">
            {placeholder => (
              <Field
                type="text"
                hint={placeholder}
                name=""
                onUpdate={this.updateSurnameField}
                isError={this.state.isInputError}
              />
            )}
          </FormattedMessage>
          <FormattedMessage id="app.components.SignInPage.email">
            {placeholder => (
              <Field
                type="text"
                hint={placeholder}
                name=""
                onUpdate={this.updateSignUpEmailField}
                isError={this.state.isInputError}
              />
            )}
          </FormattedMessage>
          <FormattedMessage id="app.components.SignInPage.password">
            {placeholder => (
              <Field
                type="password"
                hint={placeholder}
                name=""
                onUpdate={this.updateSignUpPasswordField}
                isError={this.state.isInputError}
              />
            )}
          </FormattedMessage>
          <Button
            text={<FormattedMessage {...messages.signup} />}
            onClick={this.onSignUp}
          />
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

    let mainPart;
    if (this.state.signIn) {
      mainPart = signInPart;
    } else {
      mainPart = signUpPart;
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
  onCloseClick: PropTypes.func,
  tryLogin: PropTypes.func,
  trySignUp: PropTypes.func,
  discardRegisteredState: PropTypes.func,
  discardLoginState: PropTypes.func,
  isAuthorized: PropTypes.bool,
  loginStateReceived: PropTypes.bool,
  isLoginError: PropTypes.bool,
  isRegistered: PropTypes.bool,
  signinStateReceived: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  isAuthorized: makeSelectIsAuthorized(),
  loginStateReceived: makeSelectIsLoginStateReceived(),
  isLoginError: makeSelectIsLoginError(),
  isRegistered: makeSelectIsRegistered(),
  signinStateReceived: makeSelectIsSigninStateReceived(),
});

export function mapDispatchToProps(dispatch) {
  return {
    tryLogin(email, password) {
      dispatch(tryLogin(email, password));
    },

    trySignUp(name, surname, email, password) {
      dispatch(trySignUp(name, surname, email, password));
    },

    discardRegisteredState() {
      dispatch(discardRegistered());
    },

    discardLoginState() {
      dispatch(discardLogin());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignInPage);
