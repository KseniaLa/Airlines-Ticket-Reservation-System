import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class Image extends React.PureComponent {
  render() {
    return (
      <img
        src={require(`../../../images/${this.props.path}`)}
        className={this.props.className}
        alt=""
      />
    );
  }
}
Image.propTypes = {
  path: PropTypes.string,
  className: PropTypes.string,
};

export default Image;
