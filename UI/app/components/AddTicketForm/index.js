import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../basic/Button';
import TextField from '../basic/TextField';
import Select from '../basic/Select';
import ErrorMessage from '../basic/ErrorMessage';
import './style.scss';
import messages from './messages';

class AddTicketForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      flightClass: 'business',
      flight: '', // !
      count: '',
      price: '',
      company: '',
      isInputError: false,
    };
    this.onSelectValueChange = this.onSelectValueChange.bind(this);
    this.onSelectFlightChange = this.onSelectFlightChange.bind(this);
    this.updateCountField = this.updateCountField.bind(this);
    this.updatePriceField = this.updatePriceField.bind(this);
    this.updateCompanyField = this.updateCompanyField.bind(this);
    this.addTicket = this.addTicket.bind(this);
  }

  onSelectValueChange(e) {
    this.setState({ flightClass: e.target.value });
  }

  onSelectFlightChange(e) {
    this.setState({ flight: e.target.value });
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
    const { flight, count, price, company, flightClass } = this.state;
    if (flight && count && price && count > 0 && price > 0 && company) {
      this.setState({ isInputError: false });
      this.props.onTicketSubmit(flight, company, flightClass, price, count);
    } else {
      this.setState({ isInputError: true });
    }
  }

  render() {
    return (
      <form className="info-area" onSubmit={this.addTicket}>
        {this.state.isInputError && (
          <ErrorMessage
            text={<FormattedMessage {...messages.invalidinput} />}
          />
        )}
        <div className="date-time">
          <Select
            items={this.props.flights}
            value={this.state.class}
            values={this.props.values}
            onChange={this.onSelectFlightChange}
            notSelected
            placeholder="Choose flight"
          />
          <FormattedMessage id="app.components.AddPage.company">
            {placeholder => (
              <TextField
                type="text"
                hint={placeholder}
                onUpdate={this.updateCompanyField}
              />
            )}
          </FormattedMessage>
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
  flights: PropTypes.array,
  values: PropTypes.array,
  onTicketSubmit: PropTypes.func,
};

export default AddTicketForm;
