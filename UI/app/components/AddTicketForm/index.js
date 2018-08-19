import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../basic/Button';
import TextField from '../basic/TextField';
import Select from '../basic/Select';
import './style.scss';
import messages from './messages';

class AddTicketForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      flightClass: 'business',
      from: '',
      to: '',
      count: '',
      price: '',
      company: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSelectValueChange = this.onSelectValueChange.bind(this);
    this.updateFromField = this.updateFromField.bind(this);
    this.updateToField = this.updateToField.bind(this);
    this.updateCountField = this.updateCountField.bind(this);
    this.updatePriceField = this.updatePriceField.bind(this);
    this.updateCompanyField = this.updateCompanyField.bind(this);
    this.addTicket = this.addTicket.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }

  onSelectValueChange(e) {
    this.setState({ flightClass: e.target.value });
  }

  updateFromField(e) {
    this.setState({ from: e.target.value });
  }

  updateToField(e) {
    this.setState({ to: e.target.value });
  }

  updateCountField(e) {
    this.setState({ count: e.target.value });
  }

  updatePriceField(e) {
    this.setState({ price: e.target.value });
  }

  updateCompanyField(e) {
    this.setState({ company: e.target.value });
  }

  addTicket(e) {
    e.preventDefault();
    const {
      from,
      to,
      count,
      price,
      company,
      flightClass,
      startDate,
    } = this.state;
    if (
      from !== '' &&
      to !== '' &&
      count !== '' &&
      price !== '' &&
      company !== '' &&
      startDate !== null
    ) {
      this.props.onTicketSubmit(
        from,
        to,
        startDate,
        company,
        flightClass,
        price,
        count,
      );
    }
  }

  render() {
    return (
      <form className="info-area" onSubmit={this.addTicket}>
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
          <FormattedMessage id="app.components.AddPage.company">
            {placeholder => (
              <TextField
                type="text"
                hint={placeholder}
                onUpdate={this.updateCompanyField}
              />
            )}
          </FormattedMessage>
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
          <FormattedMessage id="app.components.AddPage.price">
            {placeholder => (
              <TextField
                type="number"
                hint={placeholder}
                onUpdate={this.updatePriceField}
              />
            )}
          </FormattedMessage>
        </div>
        <div className="count">
          <FormattedMessage id="app.components.AddPage.count">
            {placeholder => (
              <TextField
                type="number"
                hint={placeholder}
                onUpdate={this.updateCountField}
              />
            )}
          </FormattedMessage>

          <Button text={<FormattedMessage {...messages.addbutton} />} />
        </div>
      </form>
    );
  }
}

AddTicketForm.propTypes = {
  onTicketSubmit: PropTypes.func,
};

export default AddTicketForm;
