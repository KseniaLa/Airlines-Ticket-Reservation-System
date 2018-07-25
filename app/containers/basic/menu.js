import React from 'react';
import './basic_style.scss';

export default class Menu extends React.Component {

    createList = () => {
      let list = []
      for (let i = 0; i < this.props.items.length; i++) {
        list.push(<li>{this.props.items[i]}</li>)
      }
      return list;
    }
  
    render() {
      return (
        <ul className='menu'>
          {this.createList()}
        </ul>
      )
    }
  }