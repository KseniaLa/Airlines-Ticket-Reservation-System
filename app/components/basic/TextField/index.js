import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class TextField extends React.PureComponent {
  render() {
    return (
      <input
        className="field"
        type={this.props.type}
        placeholder={this.props.hint}
        min="1"
        name={this.props.name}
        onChange={this.props.update}
      />
    );
  }
}

TextField.propTypes = {
  type: PropTypes.string,
  hint: PropTypes.string,
  name: PropTypes.string,
};

export default TextField;
