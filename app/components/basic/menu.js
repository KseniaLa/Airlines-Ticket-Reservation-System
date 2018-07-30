import React from 'react';
import { Link } from 'react-router-dom';
import './basic_style.scss';

export default class Menu extends React.Component {

    createList = () => {
      let list = []
      for (let i = 0; i < this.props.items.length; i++) {
        list.push(<li><Link to='/somepath'>{this.props.items[i]}</Link></li>)
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