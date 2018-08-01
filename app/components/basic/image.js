import React from 'react';
import PropTypes from 'prop-types';
import './basic_style.scss';

/* eslint-disable react/prefer-stateless-function */
class Image extends React.Component {
  render() {
    return (
      <img src={this.props.path} className={this.props.className} alt="" />
    );
  }
}

Image.propTypes = {
  path: PropTypes.string,
  className: PropTypes.string,
};

export default Image;
