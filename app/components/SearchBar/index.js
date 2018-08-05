import React from 'react';
import { Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../basic/Button';
import TextField from '../basic/TextField';
import Select from '../basic/Select';
import ErrorMessage from '../basic/ErrorMessage';

import localMessages from './messages';
import './style.scss';

export default class SearchBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      toResults: false,
      isInputError: false,
      from: '',
      to: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.updateFromField = this.updateFromField.bind(this);
    this.updateToField = this.updateToField.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.from !== '' && this.state.to !== '') {
      this.setState({ toResults: true });
    } else {
      this.setState({ isInputError: true });
    }
  }

  updateFromField(e) {
    this.setState({ from: e.target.value });
  }

  updateToField(e) {
    this.setState({ to: e.target.value });
  }

  render() {
    if (this.state.toResults) {
      return <Redirect to="/results" />;
    }
    return (
      <div>
        {this.state.isInputError && (
          <ErrorMessage
            text={<FormattedMessage {...localMessages.invalidinput} />}
          />
        )}
        <form className="search-bar" onSubmit={this.onSubmit}>
          <div>
            <FormattedMessage id="app.components.AddPage.fromfield">
              {placeholder => (
                <TextField
                  type="text"
                  hint={placeholder}
                  onUpdate={this.updateFromField}
                />
              )}
            </FormattedMessage>
            <FormattedMessage id="app.components.AddPage.tofield">
              {placeholder => (
                <TextField
                  type="text"
                  hint={placeholder}
                  onUpdate={this.updateToField}
                />
              )}
            </FormattedMessage>
          </div>
          <div>
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChange}
              className="field datepic"
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
          </div>
          <div className="search-bar__button">
            <Button text={<FormattedMessage {...localMessages.search} />} />
          </div>
        </form>
      </div>
    );
  }
}
