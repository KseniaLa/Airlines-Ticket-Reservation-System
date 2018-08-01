import React from 'react';
import PropTypes from 'prop-types';
import './basic_style.scss';

/* eslint-disable react/prefer-stateless-function */
class SocialIcon extends React.Component {
  render() {
    return (
      <div className="socialicon" onClick={this.props.onClick}>
        <i className={this.props.icon} />
      </div>
    );
  }
}

SocialIcon.propTypes = {
  icon: PropTypes.string,
  onClick: PropTypes.func,
};

export default SocialIcon;
