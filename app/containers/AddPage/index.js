import React from 'react';
import { FormattedMessage } from 'react-intl';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../../components/basic/Button/button';
import AddTicketForm from './AddTicketForm';
import './style.scss';

import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class AddPage extends React.Component {
  render() {
    return (
      <div className="container-flex">
        <div className="addticket-area">
          <h3>
            <FormattedMessage {...messages.title} />
          </h3>
          <Button text={<FormattedMessage {...messages.addgroup} />} />
          <AddTicketForm />
          <AddTicketForm />
          <Button text={<FormattedMessage {...messages.addbutton} />} />
        </div>
      </div>
    );
  }
}

export default AddPage;
