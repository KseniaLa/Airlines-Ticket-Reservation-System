import React from 'react';

export default class Title extends React.Component {
  render() {
    return (
      <h1 class={this.props.style}>{this.props.text}</h1>
    )
  }
}