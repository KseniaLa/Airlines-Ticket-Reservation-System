import React from 'react';
import TextField from '../../components/basic/textfield';
import DateField from '../../components/basic/datefield';
import Button from '../../components/basic/button';
import './style.scss';

class AddTicketForm extends React.Component {
  render() {
    return (
      <div className='info-area'>
        <div className='from'><TextField type='text' hint='откуда' /></div>
        <div className='to'><TextField type='text' hint='куда' /></div>
        <div className='time'><TextField type='time' /></div>
        <div className='date'><DateField /></div>
        <div className='class'>
          <select>
            <option>бизнес</option>
            <option>первый</option>
            <option>эконом</option>
          </select>
        </div>
        <div className='company'><TextField type='text' hint='компания' /></div>
        <div className='description'>
          <textarea placeholder='описание'></textarea>
        </div>
        <div className='count'><TextField type='number' hint='количество' /></div>
      </div>
    )
  }
}

export default class AddPage extends React.Component {

  render() {
    return (
      <form className='container-flex'>
        <div className='addticket-area'>
        <h3>Добавление билетов</h3>
          <AddTicketForm />
          <Button text='Добавить' />
        </div>
      </form>
    )
  }
}
