import React from 'react';
import PropTypes from 'prop-types';
import './basic_style.scss';

class Select extends React.PureComponent {
  createOptions = () => {
    const list = [];
    const { items } = this.props;
    items.forEach((element, index) => {
      list.push(<option key={index}>{element}</option>);
    });
    return list;
  };

  render() {
    return <select className="select">{this.createOptions()}</select>;
  }
}

Select.propTypes = {
  items: PropTypes.array,
};

export default Select;
