import React from 'react';
import Title from './basic/title';
import Button from './basic/button';

export default class Header extends React.Component {
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
