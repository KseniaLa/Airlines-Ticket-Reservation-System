import React from 'react';
import Title from '../components/basic/title';
import Button from '../components/basic/button';

export default class Header extends React.Component {
  showSignIn() {
    alert("hello");
  }

  render() {
    return (
      <header className='container-flex header'>
        <div className='content-flex header__content'>
          <Title style='base-title site-name' text='Airlines' />
          <div className='header__options'>
            <Button text='Войти' onClick={this.showSignIn}/>
          </div>
        </div>
      </header>
    )
  }
}
