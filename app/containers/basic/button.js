import React from 'react';
import ReactDOM from 'react-dom';
import './basic_style.scss';

export default class Button extends React.Component {
  render() {
    return (
      <button className='page-button'>{this.props.text}</button>
    )
  }
}
