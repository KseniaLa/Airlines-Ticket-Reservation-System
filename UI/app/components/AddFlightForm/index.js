import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'moment/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import { config } from '../../utils/configLoader';
import Button from '../basic/Button';
import Select from '../basic/Select';
import TextField from '../basic/TextField';
import ErrorMessage from '../basic/ErrorMessage';
import './style.scss';
import messages from './messages';

moment.locale('ru', config.locale_ru);

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
    moment.locale(this.props.language);
    return (
      <form className="info-area" onSubmit={this.addFlight}>
        {this.state.isInputError && (
          <ErrorMessage
            text={<FormattedMessage {...messages.invalidinput} />}
          />
        )}
        <div>
          <Select
            items={this.props.cities}
            value={this.state.class}
            values={this.props.values}
            onChange={this.updateFromField}
            notSelected
            placeholder="choose city"
          />
          <Select
            items={this.props.cities}
            value={this.state.class}
            values={this.props.values}
            onChange={this.updateToField}
            notSelected
            placeholder="choose city"
          />
          {/* <FormattedMessage id="app.components.AddPage.fromfield">
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
          </FormattedMessage> */}
        </div>
        <div className="date-time">
          <DatePicker
            selected={this.state.startDate}
            showTimeSelect
            onChange={this.handleDateChange}
            className="datepicker"
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="LLL"
            timeCaption="time"
          />
          <Button text={<FormattedMessage {...messages.add} />} />
        </div>
      </form>
    );
  }
}

AddFlightForm.propTypes = {
  cities: PropTypes.array,
  values: PropTypes.array,
  language: PropTypes.string,
  onFlightSubmit: PropTypes.func,
};

export default AddFlightForm;
