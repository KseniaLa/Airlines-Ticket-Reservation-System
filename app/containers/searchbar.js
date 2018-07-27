import React from 'react';
import Button from '../components/basic/button';
import TextField from '../components/basic/textfield';
import DateField from '../components/basic/datefield';
import {Link} from 'react-router-dom';

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
          <Link to='/results'><Button text='Найти билеты' path='/results' /></Link>
        </div>
      )
    }
  }
