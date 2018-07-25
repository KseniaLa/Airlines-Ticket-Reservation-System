import React from 'react';
import Button from '../components/basic/button';
import TextField from '../components/basic/textfield';
import DateField from '../components/basic/datefield';

export default class SearchBar extends React.Component {
    render() {
      return (
        <div className='search-bar'>
          <div className='search-bar__input-area'>
            <TextField hint='откуда' />
            <TextField hint='откуда' />
            <DateField />
            <DateField />
          </div>
          <Button text='Найти билеты' />
        </div>
      )
    }
  }