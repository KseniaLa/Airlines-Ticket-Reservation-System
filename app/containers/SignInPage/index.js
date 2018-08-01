import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import 'font-awesome/css/font-awesome.min.css';

import messages from './messages';

import Button from '../../components/basic/button';
import Field from '../../components/basic/textfield';
import Title from '../../components/basic/title';
import './style.scss';
import { makeSelectIsModalVisible } from '../App/globalSelectors';
import { setModalState } from '../App/globalActions';

class SignInPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { signIn: true };
    this.handleChangeModeClick = this.handleChangeModeClick.bind(this);
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
          <Button text={<FormattedMessage {...messages.signin} />} />
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

    if (this.props.visible) {
      return (
        <section className="sign-overlay">
          <section className="sign-page">
            <button className="close-button" onClick={this.props.hideSignIn}>
              <i className="fa fa-times" />
            </button>
            {mainPart}
          </section>
        </section>
      );
    }
    return <div />;
  }
}

SignInPage.propTypes = {
  hideSignIn: PropTypes.func,
  visible: PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
  return {
    hideSignIn() {
      dispatch(setModalState(false));
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
