import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class TextField extends React.PureComponent {
  constructor(props) {
    super(props);
    this.checkIsError = this.checkIsError.bind(this);
  }

  checkIsError() {
    return this.props.isError ? 'error-field' : 'field';
  }

  render() {
    return (
      <input
        className="field"
        type={this.props.type}
        placeholder={this.props.hint}
        min="1"
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
  isError: PropTypes.bool,
};

export default TextField;
