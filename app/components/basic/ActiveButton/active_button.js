import React from 'react';
import PropTypes from 'prop-types';
import '../basic_style.scss';

class ActiveButton extends React.Component {
  render() {
    return (
      <button className='page-button_active' onClick={this.props.onClick}>
      {this.props.text}
      </button>
    )
  }
}

ActiveButton.propTypes = {
  text: PropTypes.object,
  onClick: PropTypes.func,
};

export default ActiveButton;
