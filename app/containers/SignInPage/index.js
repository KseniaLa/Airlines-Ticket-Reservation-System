import React from 'react';
import 'font-awesome/css/font-awesome.min.css';

import Button from '../basic/button';
import Field from '../basic/textfield';
import Title from '../basic/title';
import './style.scss';

class CloseButton extends React.Component {
  render() {
    return (
      <button className='close-button'></button>
    )
  }
}

export default class SignInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: true, signIn: true };
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleChangeModeClick = this.handleChangeModeClick.bind(this);
    this.signInPart = (
      <div className='container'>
        <form className='sign-page__form'>
          <Title style='sign-page__title' text='Авторизация' />
          <Field type='text' hint='e-mail' />
          <Field type='password' hint='password' />
          <Button text='Войти' />
        </form>
        <div>
          <h1>cfgvyj</h1>
        <Button text='Зарегистрироваться' onClick={this.handleChangeModeClick} />
        </div>
      </div>
    );

    this.signUpPart = (
      <div className='container'>
        <form className='sign-page__form'>
          <Title style='sign-page__title' text='Регистрация' />
          <Field type='text' hint='e-mail' />
          <Field type='text' hint='e-mail' />
          <Field type='text' hint='e-mail' />
          <Button text='Зарегистрироваться' />
        </form>
        <Button text='Войти' onClick={this.handleChangeModeClick} />
      </div>
    );
  }

  handleCloseClick() {
    this.setState({ visible: false });
  }

  handleChangeModeClick() {
    let sign = this.state.signIn;
    this.setState({ signIn: !sign });
  }

  render() {
    let mainPart;
    if (this.state.signIn) {
      mainPart = this.signInPart;
    } else {
      mainPart = this.signUpPart;
    }

    if (this.state.visible) {
      return (
        <div className='sign-overlay'>
          <section className='sign-page'>
            <button className='close-button' onClick={this.handleCloseClick}>
              <i class="fa fa-times"></i>
            </button>
            {mainPart}
          </section>
        </div>
      )
    }
    return (<div></div>);
  }
}