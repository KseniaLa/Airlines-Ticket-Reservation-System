import React from 'react';
import Button from '../../components/basic/button';
import './style.scss';

export default class UserPage extends React.Component {
  render() {
    return (
      <div className='container-flex'>
        <section className='content-flex user-card'>
          <h1 className='user-card__name'>User Name</h1>
          <div className='user-card__navbar'>
          <div>
            <Button text='Заказанные билеты'/> 
            <Button text='Корзина'/>
          </div>
            <Button text='Подтвердить заказ'/>
          </div>
          <div className='user-card__tickets-area'>

          </div>
        </section>
      </div>
    );
  }
}