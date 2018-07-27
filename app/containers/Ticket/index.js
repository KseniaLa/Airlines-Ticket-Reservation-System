import React from 'react';
import Button from '../../components/basic/button';
import './style.scss';

export default class Ticket extends React.Component {
  render() {
    return (
      <section className='ticket'>
        <h2 className='ticket__title'>{this.props.title}</h2>
        <div className='ticket__company'>{this.props.company}</div>
        <div className='category'><h3>business</h3></div>
        <div className='ticket__description'>{this.props.description}</div>
        <h3 className='ticket__time'>Время: {this.props.time}</h3>
        <div className='ticket__price'><h3>Цена: {this.props.price} BYN</h3></div>
        <div className='ticket__count'>
          Количество
        <input className='ticket-field' />
          <h1 className='actual-count-block'>{this.props.count}</h1>
        </div>
        <div className='ticket__add-button-area'><Button text='Добавить' /></div>
      </section>
    );
  }
}