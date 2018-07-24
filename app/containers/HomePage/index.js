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
      <header className='container-flex header'>
        <div className='content-flex header__content'>
          <Title style='base-title site-name' text='Airlines' />
          <div className='header__options'>
            <Button text='Войти' />
            <Button text='Регистрация' />
          </div>
        </div>
      </header>
    )
  }
}

class Image extends React.Component {
  render() {
    return (
      <img src={this.props.path} className={this.props.style} />
    )
  }
}

class Field extends React.Component {
  render() {
    return (
      <input className='field' type={this.props.type} placeholder={this.props.hint} />
    )
  }
}

class SearchBar extends React.Component {
  render() {
    return (
      <div className='search-bar'>
        <div className='search-bar__input-area'>
          <Field hint='откуда' />
          <Field hint='откуда' />
          <Field hint='откуда' type='date' />
          <Field hint='откуда' type='date' />
        </div>
        <Button text='Найти билеты' />
      </div>
    )
  }
}


export default class HomePage extends React.PureComponent {
  render() {
    return (
      <div>
        <Header />
        <div className='container-flex'>
          <div className="image">
            <Image path={mainImage} style='main-image' />
            <div className='overlay'>
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
