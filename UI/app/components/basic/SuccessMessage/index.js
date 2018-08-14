import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class SuccessMessage extends React.PureComponent {
  render() {
    return <h3 className="success-message">{this.props.text}</h3>;
  }
}

SuccessMessage.propTypes = {
  text: PropTypes.object,
};

export default SuccessMessage;
