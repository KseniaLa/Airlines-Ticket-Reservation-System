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
    this.state = { visible: true };
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  handleCloseClick() {
    this.setState({ visible: false });
  }

  render() {
    if (this.state.visible) {
      return (
        <div className='sign-overlay'>
          <section className='sign-page'>
            <button className='close-button' onClick={this.handleCloseClick}>
              <i class="fa fa-times"></i>
            </button>
            <Title style='sign-page__title' text='Авторизация' />
            <form className='sign-page__form'>
              <Field type='text' placeholder='e-mail' />
              <Field type='password' placeholder='password' />
              <Button text='Войти' />
            </form>
          </section>
        </div>
      )
    }
    return (<div></div>);
  }
}