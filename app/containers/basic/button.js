import React from 'react';

export default class Button extends React.Component {
  render() {
    return (
      <button className='page-button'>{this.props.text}</button>
    )
  }
}