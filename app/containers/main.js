import React from 'react';

export default class Main extends React.PureComponent {
  render() {
    return (
      <main className='container-flex'>
        {this.props.children}
      </main>
    );
  }
}
