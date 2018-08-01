import React from 'react';
import { FormattedMessage } from 'react-intl';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import TextField from '../../components/basic/textfield';
import './style.scss';

import messages from './messages';

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
        <div className="from">
          <FormattedMessage id="app.components.AddPage.fromfield">
            {placeholder => <TextField type="text" hint={placeholder} />}
          </FormattedMessage>
        </div>
        <div className="to">
          <FormattedMessage id="app.components.AddPage.tofield">
            {placeholder => <TextField type="text" hint={placeholder} />}
          </FormattedMessage>
        </div>
        <div className="time">
          <TextField type="time" />
        </div>
        <div className="date">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            className="datepicker"
          />
        </div>
        <div className="class">
          <select>
            <option>
              <FormattedMessage {...messages.businessclass} />
            </option>
            <option>
              <FormattedMessage {...messages.firstclass} />
            </option>
            <option>
              <FormattedMessage {...messages.budgetclass} />
            </option>
          </select>
        </div>
        <div className="company">
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
