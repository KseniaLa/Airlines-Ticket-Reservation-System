import React from 'react';
import Button from './basic/button';
import TextField from './basic/textfield';
import DateField from './basic/datefield';

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