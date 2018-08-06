import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class ActiveButton extends React.PureComponent {
  render() {
    return (
      <button className="page-button_active" onClick={this.props.onClick}>
        {this.props.text}
      </button>
    );
  }
}

ActiveButton.propTypes = {
  text: PropTypes.object,
  onClick: PropTypes.func,
};

export default ActiveButton;
