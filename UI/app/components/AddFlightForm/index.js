import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../basic/Button';
import TextField from '../basic/TextField';
import ErrorMessage from '../basic/ErrorMessage';
import './style.scss';
import messages from './messages';

class AddFlightForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      from: '',
      to: '',
      isInputError: false,
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.updateFromField = this.updateFromField.bind(this);
    this.updateToField = this.updateToField.bind(this);
    this.addFlight = this.addFlight.bind(this);
  }

  handleDateChange(date) {
    this.setState({
      startDate: date,
    });
  }

  updateFromField(e) {
    this.setState({ from: e.target.value });
  }

  updateToField(e) {
    this.setState({ to: e.target.value });
  }

  addFlight(e) {
    e.preventDefault();
    const { from, to, startDate } = this.state;
    if (from && to && startDate) {
      this.setState({ isInputError: false });
      this.props.onFlightSubmit(from, to, startDate);
    } else {
      this.setState({ isInputError: true });
    }
  }

  render() {
    return (
      <form className="info-area" onSubmit={this.addFlight}>
        {this.state.isInputError && (
          <ErrorMessage
            text={<FormattedMessage {...messages.invalidinput} />}
          />
        )}
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
        <div className="date-time">
          <DatePicker
            selected={this.state.startDate}
            showTimeSelect
            onChange={this.handleDateChange}
            className="datepicker"
          />
          <Button text={<FormattedMessage {...messages.add} />} />
        </div>
      </form>
    );
  }
}

AddFlightForm.propTypes = {
  onFlightSubmit: PropTypes.func,
};

export default AddFlightForm;
