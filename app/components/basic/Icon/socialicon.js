import React from 'react';
import PropTypes from 'prop-types';
import '../basic_style.scss';

class SocialIcon extends React.PureComponent {
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
