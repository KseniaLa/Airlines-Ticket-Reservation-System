import React from 'react';
import 'font-awesome/css/font-awesome.min.css';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Button from '../../components/basic/button';
import Field from '../../components/basic/textfield';
import Title from '../../components/basic/title';
import './style.scss';
import { makeSelectIsModalVisible } from '../App/selectors/globalSelectors';

class SignInPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { signIn: true };
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleChangeModeClick = this.handleChangeModeClick.bind(this);
    this.signInPart = (
      <div className="container">
        <form className="sign-page__form">
          <Title style="sign-page__title" text="Авторизация" />
          <Field type="text" hint="e-mail" />
          <Field type="password" hint="password" />
          <Button text="Войти" />
        </form>
        <div className="change-mode">
          <h6>Я новый пользователь</h6>
          <Button
            text="Зарегистрироваться"
            onClick={this.handleChangeModeClick}
          />
        </div>
      </div>
    );

    this.signUpPart = (
      <div className="container">
        <form className="sign-page__form">
          <Title style="sign-page__title" text="Регистрация" />
          <Field type="text" hint="e-mail" />
          <Field type="text" hint="e-mail" />
          <Field type="text" hint="e-mail" />
          <Button text="Зарегистрироваться" />
        </form>
        <div className="change-mode">
          <h6>Уже есть логин</h6>
          <Button text="Войти" onClick={this.handleChangeModeClick} />
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

export function mapDispatchToProps(dispatch) {
  return {
    hideSignIn() {
      dispatch({
        type: 'SHOW_SIGN_MODAL',
        payload: false,
      });
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
