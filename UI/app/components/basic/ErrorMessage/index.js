import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class ErrorMessage extends React.PureComponent {
  render() {
    return <h3 className="error-message">{this.props.text}</h3>;
  }
}

ErrorMessage.propTypes = {
  text: PropTypes.object,
};

export default ErrorMessage;
