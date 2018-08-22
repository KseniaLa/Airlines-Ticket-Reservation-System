import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class CountButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick(this.props.count);
  }

  render() {
    return (
      <button className="count-button" onClick={this.handleClick}>
        {this.props.text}
      </button>
    );
  }
}

CountButton.propTypes = {
  count: PropTypes.number,
  onClick: PropTypes.func,
  text: PropTypes.any,
};

export default CountButton;
