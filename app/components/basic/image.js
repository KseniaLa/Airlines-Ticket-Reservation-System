import React from 'react';
import PropTypes from 'prop-types';
import './basic_style.scss';

class Image extends React.Component {
  render() {
    return (
      <img src={this.props.path} className={this.props.className} />
    )
  }
}

Image.propTypes = {
  path: PropTypes.string,
};

export default Image;
