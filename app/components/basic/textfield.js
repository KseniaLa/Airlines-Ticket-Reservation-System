import React from 'react';
import PropTypes from 'prop-types';
import './basic_style.scss';

class TextField extends React.Component {
  render() {
    return (
      <input
        className="field"
        type={this.props.type}
        placeholder={this.props.hint}
        min="1"
        name={this.props.name} />
    )
  }
}

TextField.propTypes = {
  type: PropTypes.string,
  hint: PropTypes.string,
  name: PropTypes.string,
};

export default TextField;

