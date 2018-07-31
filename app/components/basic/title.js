import React from 'react';
import PropTypes from 'prop-types';
import './basic_style.scss';

class Title extends React.Component {
  render() {
    return (
      <h1 className={this.props.style}>{this.props.text}</h1>
    )
  }
}

Title.propTypes = {
  style: PropTypes.string,
  text: PropTypes.string,
};

export default Title;
