import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class Button extends React.PureComponent {
  render() {
    return (
      <button className="page-button" onClick={this.props.onClick}>
        {this.props.text}
      </button>
    );
  }
}

Button.propTypes = {
  text: PropTypes.object,
  onClick: PropTypes.func,
};

export default Button;
