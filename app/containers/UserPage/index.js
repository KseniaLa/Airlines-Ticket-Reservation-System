import React from 'react';
import Button from '../../components/basic/button';
import Ticket from '../Ticket/index';
import './style.scss';

export default class UserPage extends React.Component {
  render() {
    return (
      <div className='container-flex'>
        <section className='content-flex user-card'>
          <h1 className='user-card__name'>User Name</h1>
          <div className='user-card__navbar'>
            <div>
              <Button text='Заказанные билеты' />
              <Button text='Корзина' />
            </div>
            <Button text='Подтвердить заказ' />
          </div>
          <div className='user-card__tickets-area'>
            <Ticket
              title='Минск-Москва'
              company='Аэрофлот'
              description='без пересадок'
              time='12.30'
              price='500'
              count='345' />

            <Ticket
              title='Минск-Москва'
              company='Аэрофлот'
              description='без пересадок'
              time='12.30'
              price='500'
              count='345' />

            <Ticket
              title='Минск-Москва'
              company='Аэрофлот'
              description='без пересадок'
              time='12.30'
              price='500'
              count='345' />

          </div>
        </section>
      </div>
    );
  }
}