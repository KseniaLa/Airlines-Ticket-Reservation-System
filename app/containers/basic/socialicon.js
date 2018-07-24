import React from 'react';

export default class SocialIcon extends React.Component {
    render() {
      return (
        <div className='socialicon'><i className={this.props.icon}></i></div>
      )
    }
  }