import React from 'react';
import PropTypes from 'prop-types';
import './basic_style.scss';

class Button extends React.Component {
  render() {
    return (
      <button className='page-button' onClick={this.props.onClick}>
      {this.props.text}
      </button>
    )
  }
}

Button.propTypes = {
  text: PropTypes.object,
  onClick: PropTypes.func,
};

export default Button;
