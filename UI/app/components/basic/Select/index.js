import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class Select extends React.PureComponent {
  createOptions = () => {
    const list = [];
    const { items, values } = this.props;
    items.forEach((element, index) => {
      list.push(
        <option key={index} value={values[index]}>
          {element}
        </option>,
      );
    });
    return list;
  };

  render() {
    return (
      <select
        className="select"
        size="1"
        value={this.props.value}
        onChange={this.props.onChange}
      >
        {this.createOptions()}
      </select>
    );
  }
}

Select.propTypes = {
  items: PropTypes.array,
  value: PropTypes.string,
  values: PropTypes.array,
  onChange: PropTypes.func,
};

export default Select;
