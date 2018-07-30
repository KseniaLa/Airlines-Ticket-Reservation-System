import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../../components/basic/button';
import TextField from '../../components/basic/textfield';

import messages from './messages';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }

  render() {
    return (
      <form className="search-bar">
        <TextField hint="откуда" />
        <TextField hint="куда" />
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
          className="field"
        />
        <TextField hint="куда" />
        <div className="search-bar__button">
          <Link to="/results">
            <Button text={<FormattedMessage {...messages.search} />} />
          </Link>
        </div>
      </form>
    );
  }
}
