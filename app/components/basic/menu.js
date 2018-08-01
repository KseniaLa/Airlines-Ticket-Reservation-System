import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './basic_style.scss';

class Menu extends React.Component {
  createList = () => {
    const list = [];
    const { items } = this.props;
    items.forEach((element, index) => {
      list.push(
        <li key={index}>
          <Link to="/somepath">{element}</Link>
        </li>,
      );
    });
    return list;
  };

  render() {
    return <ul className="menu">{this.createList()}</ul>;
  }
}

Menu.propTypes = {
  items: PropTypes.array,
};

export default Menu;
