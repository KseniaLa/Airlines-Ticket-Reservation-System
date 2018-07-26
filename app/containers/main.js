import React from 'react';

export default class Main extends React.PureComponent {
  render() {
    return (
      <main>
        {this.props.children}
      </main>
    );
  }
}
