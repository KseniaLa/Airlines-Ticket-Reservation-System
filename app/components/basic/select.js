import React from 'react';
import PropTypes from 'prop-types';
import './basic_style.scss';

class Select extends React.PureComponent {
  createOptions = () => {
    const list = [];
    const { items, keys } = this.props;
    items.forEach((element, index) => {
      list.push(<option key={keys[index]}>{element}</option>);
    });
    return list;
  };

  render() {
    return <select className="select">{this.createOptions()}</select>;
  }
}

Select.propTypes = {
  items: PropTypes.array,
  keys: PropTypes.array,
};

export default Select;
