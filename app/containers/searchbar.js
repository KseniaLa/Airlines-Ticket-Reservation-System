import React from 'react';
import Button from '../components/basic/button';
import TextField from '../components/basic/textfield';
import DateField from '../components/basic/datefield';
import {Link} from 'react-router-dom';

export default class SearchBar extends React.Component {
    render() {
      return (
        <form className='search-bar'>
          {/*<div className='search-bar__input-area'>*/}
            <TextField hint='откуда' />
            <TextField hint='куда' />
            <DateField />
          {/*</div>*/}
          <Link to='/results'><Button text='Найти билеты' /></Link>
        </form>
      )
    }
  }
