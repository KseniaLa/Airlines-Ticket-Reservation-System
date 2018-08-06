import React from 'react';
import { FormattedMessage } from 'react-intl';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import TextField from '../../components/basic/TextField';
import Select from '../../components/basic/Select';
import './style.scss';

class AddTicketForm extends React.PureComponent {
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
      </div>
    );
  }
}

export default AddTicketForm;
