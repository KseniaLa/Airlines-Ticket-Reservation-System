import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../components/basic/button';
import TextField from '../components/basic/textfield';
import DateField from '../components/basic/datefield';
import { Link } from 'react-router-dom';

export default class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    return (
      <form className='search-bar'>
        <TextField hint='откуда' />
        <TextField hint='куда' />
        <DatePicker selected={this.state.startDate}
          onChange={this.handleChange} className='field'/>
        <TextField hint='куда' />
        <div className='search-bar__button'><Link to='/results'><Button text='Найти билеты' /></Link></div>
      </form>
    )
  }
}
