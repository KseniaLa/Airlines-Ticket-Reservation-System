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
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleChangeModeClick = this.handleChangeModeClick.bind(this);
    this.signInPart = (
      <div className="container">
        <form className="sign-page__form">
          <Title
            style="sign-page__title"
            text={<FormattedMessage {...messages.signintitle} />}
          />
          <Field type="text" hint="e-mail" />
          <Field type="password" hint="password" />
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
        <form className="sign-page__form">
          <Title
            style="sign-page__title"
            text={<FormattedMessage {...messages.signuptitle} />}
          />
          <Field type="text" hint="e-mail" />
          <Field type="text" hint="e-mail" />
          <Field type="text" hint="e-mail" />
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

  handleCloseClick() {
    this.setState({ visible: false });
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
        <div className="sign-overlay">
          <section className="sign-page">
            <button className="close-button" onClick={this.props.hideSignIn}>
              <i className="fa fa-times" />
            </button>
            {mainPart}
          </section>
        </div>
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
