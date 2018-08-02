import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../basic/Button';
import TextField from '../basic/TextField';
import Select from '../basic/Select';

import localMessages from './messages';
import './style.scss';

export default class SearchBar extends React.PureComponent {
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
        <FormattedMessage id="app.components.AddPage.fromfield">
          {placeholder => <TextField type="text" hint={placeholder} />}
        </FormattedMessage>
        <FormattedMessage id="app.components.AddPage.tofield">
          {placeholder => <TextField type="text" hint={placeholder} />}
        </FormattedMessage>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
          className="field"
        />
        <Select
          items={[
            <FormattedMessage id="app.components.AddPage.business">
              {ticketclass => ticketclass}
            </FormattedMessage>,
            <FormattedMessage id="app.components.AddPage.first">
              {ticketclass => ticketclass}
            </FormattedMessage>,
            <FormattedMessage id="app.components.AddPage.budget">
              {ticketclass => ticketclass}
            </FormattedMessage>,
          ]}
        />
        <div className="search-bar__button">
          <Link to="/results">
            <Button text={<FormattedMessage {...localMessages.search} />} />
          </Link>
        </div>
      </form>
    );
  }
}
