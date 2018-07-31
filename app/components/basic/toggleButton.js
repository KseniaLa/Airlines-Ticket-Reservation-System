import React from 'react';
import './basic_style.scss';


class Toggle extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };
  }

  render() {
    return (
      <button className="toggle-button" onClick={this.props.callback}>
        {this.props.value}
      </button>
    );
  }
}

export default Toggle;
