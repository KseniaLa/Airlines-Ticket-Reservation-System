import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from '../searchbar';

export default class Button extends React.Component {

  tick() {
    alert('Hello!');
    const element = (
      <div>
        <h1>Hello, world!</h1>
      </div>
    );
    ReactDOM.render(
      <SearchBar/>,
      document.getElementById('main')
    );
  }

  render() {
    return (
      <button className='page-button' onClick={this.tick}>{this.props.text}</button>
    )
  }
}
