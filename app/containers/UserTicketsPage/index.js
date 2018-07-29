import React from 'react';
import Button from '../../components/basic/button';
import Ticket from '../Ticket/index';
import Header from '../Header/header';

export default class UserTicketsPage extends React.Component {
  render() {
    return (
      <div className='container-flex'>
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
    );
  }
}
