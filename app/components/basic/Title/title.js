import React from 'react';
import PropTypes from 'prop-types';
import '../basic_style.scss';

/* eslint-disable react/prefer-stateless-function */
class Title extends React.Component {
  render() {
    return <h1 className={this.props.className}>{this.props.text}</h1>;
  }
}

Title.propTypes = {
  text: PropTypes.object,
  className: PropTypes.string,
};

export default Title;
