import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class Toggle extends React.PureComponent {
  render() {
    return (
      <button className="toggle-button" onClick={this.props.callback}>
        {this.props.value}
      </button>
    );
  }
}

Toggle.propTypes = {
  value: PropTypes.string,
  callback: PropTypes.func,
};

export default Toggle;
