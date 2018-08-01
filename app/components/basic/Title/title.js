import React from 'react';
import PropTypes from 'prop-types';
import '../basic_style.scss';

class Title extends React.PureComponent {
  render() {
    return <h1 className={this.props.className}>{this.props.text}</h1>;
  }
}

Title.propTypes = {
  text: PropTypes.object,
  className: PropTypes.string,
};

export default Title;
