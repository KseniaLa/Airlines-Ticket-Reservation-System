import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../../components/basic/Button/button';
import TextField from '../../components/basic/TextField/textfield';
import Select from '../basic/Select/select';

import messages from '../../containers/AddPage/messages';
import localMessages from './messages';
import './style.scss';

export default class SearchBar extends React.PureComponent {
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
      <form className="search-bar">
        <FormattedMessage id="app.components.AddPage.fromfield">
          {placeholder => <TextField type="text" hint={placeholder} />}
        </FormattedMessage>
        <FormattedMessage id="app.components.AddPage.tofield">
          {placeholder => <TextField type="text" hint={placeholder} />}
        </FormattedMessage>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
          className="field"
        />
        <Select
          items={[
            <FormattedMessage {...messages.businessclass} />,
            <FormattedMessage {...messages.firstclass} />,
            <FormattedMessage {...messages.budgetclass} />,
          ]}
        />
        <div className="search-bar__button">
          <Link to="/results">
            <Button text={<FormattedMessage {...localMessages.search} />} />
          </Link>
        </div>
      </form>
    );
  }
}
