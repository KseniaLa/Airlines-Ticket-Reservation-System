import React from 'react';

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };
    this.handleClick = this.handleClick.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle(isToggle) {
    console.log(this);
    this.setState({ isToggleOn: !isToggle });
  }

  handleClick() {
    this.props.callback.call();
    const isToggle = this.state.isToggleOn;
    this.toggle.call(this, isToggle);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? this.props.on : this.props.off}
      </button>
    );
  }
}

export default Toggle;
