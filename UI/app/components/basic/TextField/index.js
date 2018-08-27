import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class TextField extends React.PureComponent {
  render() {
    let elemClass;
    if (this.props.className !== undefined) {
      elemClass = this.props.className;
    } else {
      elemClass = 'field';
    }
    return (
      <input
        className={elemClass}
        type={this.props.type}
        placeholder={this.props.hint}
        min="1"
        value={this.props.children}
        name={this.props.name}
        onChange={this.props.onUpdate}
      />
    );
  }
}

TextField.propTypes = {
  type: PropTypes.string,
  hint: PropTypes.string,
  name: PropTypes.string,
  onUpdate: PropTypes.func,
};

export default TextField;
