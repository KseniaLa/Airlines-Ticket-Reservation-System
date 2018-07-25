import React from 'react';
import './basic_style.scss';

export default class SocialIcon extends React.Component {
    render() {
      return (
        <div className='socialicon'><i className={this.props.icon}></i></div>
      )
    }
  }