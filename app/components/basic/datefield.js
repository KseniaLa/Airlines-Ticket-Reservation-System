import React from 'react';
import './basic_style.scss';

export default class DateField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date().toISOString().substr(0, 10) };
  }

  render() {
    return <input className="field" type="date" min={this.state.date} />;
  }
}
