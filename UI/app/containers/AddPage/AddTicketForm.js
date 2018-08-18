import React from 'react';
import { FormattedMessage } from 'react-intl';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../../components/basic/Button';
import TextField from '../../components/basic/TextField';
import Select from '../../components/basic/Select';
import './style.scss';

class AddTicketForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      flightClass: 'business',
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSelectValueChange = this.onSelectValueChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }

  onSelectValueChange(e) {
    this.setState({ flightClass: e.target.value });
  }

  render() {
    return (
      <div className="info-area">
        <div>
          <FormattedMessage id="app.components.AddPage.fromfield">
            {placeholder => <TextField type="text" hint={placeholder} />}
          </FormattedMessage>
          <FormattedMessage id="app.components.AddPage.tofield">
            {placeholder => <TextField type="text" hint={placeholder} />}
          </FormattedMessage>
        </div>
        <div className="date-time">
          <TextField type="time" />
          <DatePicker
            selected={this.state.startDate}
            showTimeSelect
            onChange={this.handleChange}
            className="datepicker"
          />
        </div>
        <div>
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
          />
          <FormattedMessage id="app.components.AddPage.company">
            {placeholder => <TextField type="text" hint={placeholder} />}
          </FormattedMessage>
        </div>
        <div className="count">
          <FormattedMessage id="app.components.AddPage.count">
            {placeholder => <TextField type="number" hint={placeholder} />}
          </FormattedMessage>
        </div>
        <Button text="submit" />
      </div>
    );
  }
}

export default AddTicketForm;
