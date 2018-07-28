import React from 'react';
import TextField from '../../components/basic/textfield';
import DateField from '../../components/basic/datefield';
import Button from '../../components/basic/button';
import './style.scss';

export default class AddPage extends React.Component {

  render() {
    return (
      <main className='container-flex'>
        <div className='addticket-area'>
          <div className='title'><h3>Добавление билетов</h3></div>
          <div className='from'><TextField type='text' hint='dfbv'/></div>
          <div className='to'><TextField type='text' hint='dfbv'/></div>
          <div className='time'><TextField type='time'/></div>
          <div className='date'><DateField /></div>
          <div className='class'>
            <select>
              <option>business</option>
              <option>normal</option>
              <option>sfdgx</option>
            </select>
          </div>
          <div className='company'><TextField type='text' hint='dfbv'/></div>
          <div className='description'>
          <textarea placeholder='описание'></textarea>
          </div>
          <div className='count'><TextField type='number' hint='dfbv'/></div>
          <div className='add-button-area'><Button text='hello' /></div>
        </div>
      </main>
    )
  }
}
