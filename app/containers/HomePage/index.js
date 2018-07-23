/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import './style.scss';
import mainImage from './plane_main.jpg';

class Button extends React.Component {
  render() {
    return (
      <button className='page-button'>{this.props.text}</button>
    )
  }
}

class Title extends React.Component {
  render() {
    return (
      <h1 class={this.props.style}>{this.props.text}</h1>
    )
  }
}

class Header extends React.Component {
  render() {
    return (
      <div className='content-flex header'>
        <Title style='base-title' text='Airlines' />
        <div className='header__content'>
          <Button text='Войти' />
          <Button text='Регистрация' />
        </div>
      </div>
    )
  }
}

class Image extends React.Component {
  render() {
    return (
      <img src={this.props.path} className={this.props.style}/>
    )
  }
}

export default class HomePage extends React.PureComponent {
  render() {
    return (
      <div className='container-flex'>
        <Header />
        <div className="image">
          <Image path={mainImage} style='main-image' />
          <h2>Hello<br />text here</h2>
        </div>
      </div>
    );
  }
}
