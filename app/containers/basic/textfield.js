import React from 'react';

export default class TextField extends React.Component {
    render() {
      return (
        <input className='field' type={this.props.type} placeholder={this.props.hint} />
      )
    }
  }
  