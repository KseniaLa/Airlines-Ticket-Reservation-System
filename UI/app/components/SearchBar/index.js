import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
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

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      isInputError: false,
      from: '',
      to: '',
      flightClass: 'business',
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.updateFromField = this.updateFromField.bind(this);
    this.updateToField = this.updateToField.bind(this);
    this.onSelectValueChange = this.onSelectValueChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.from !== '' && this.state.to !== '') {
      this.setState({ isInputError: false });
      const { from, to, flightClass, startDate } = this.state;
      this.props.onSearch(from, to, startDate, flightClass);
      this.props.history.push('/results');
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

  onSelectValueChange(e) {
    this.setState({ flightClass: e.target.value });
  }

  render() {
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
              value={this.state.class}
              values={['business', 'first', 'budget']}
              onChange={this.onSelectValueChange}
              notSelected={false}
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

SearchBar.propTypes = {
  onSearch: PropTypes.func,
  history: PropTypes.object,
  language: PropTypes.string,
};

export default withRouter(SearchBar);
