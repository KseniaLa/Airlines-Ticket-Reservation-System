import React from 'react';
import './basic_style.scss';

export default class DateField extends React.Component {
    constructor(props) {
      super(props);
      this.state = { date: new Date() };
    }
  
    render() {
      return (
        <input className='field' type='date' value='2018-07-24' />
      )
    }
  }