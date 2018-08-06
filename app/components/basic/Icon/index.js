import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class SocialIcon extends React.PureComponent {
  render() {
    return (
      <button className="socialicon" onClick={this.props.onClick}>
        <i className={this.props.icon} />
      </button>
    );
  }
}

SocialIcon.propTypes = {
  icon: PropTypes.string,
  onClick: PropTypes.func,
};

export default SocialIcon;
