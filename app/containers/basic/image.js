import React from 'react';
import './basic_style.scss';

export default class Image extends React.Component {
    render() {
      return (
        <img src={this.props.path} className={this.props.style} />
      )
    }
  }