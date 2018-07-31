import React from 'react';
import { FormattedMessage } from 'react-intl';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import TextField from '../../components/basic/textfield';
import Button from '../../components/basic/button';
import './style.scss';

import messages from './messages';

class AddTicketForm extends React.Component {
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
          <TextField
            type="text"
            hint={<FormattedMessage {...messages.from} />}
          />
        </div>
        <div className="to">
          <TextField type="text" hint={<FormattedMessage {...messages.to} />} />
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
          <TextField type="text" hint="компания" />
        </div>
        <div className="count">
          <TextField type="number" hint="количество" />
        </div>
      </div>
    );
  }
}

export default class AddPage extends React.Component {
  render() {
    return (
      <form className="container-flex">
        <div className="addticket-area">
          <h3>
            <FormattedMessage {...messages.title} />
          </h3>
          <AddTicketForm />
          <Button text={<FormattedMessage {...messages.addbutton} />} />
        </div>
      </form>
    );
  }
}
