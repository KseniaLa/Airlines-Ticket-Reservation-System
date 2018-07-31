import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Ticket from '../../components/Ticket/index';

export default class UserTicketsPage extends React.Component {
  render() {
    return (
      <div className="container-flex">
        <Ticket
          title="Минск-Москва"
          company="Аэрофлот"
          time="12.30"
          price="500"
          count="345"
          action={<FormattedMessage {...messages.undo} />}
        />

        <Ticket
          title="Минск-Москва"
          company="Аэрофлот"
          time="12.30"
          price="500"
          count="345"
          action={<FormattedMessage {...messages.undo} />}
        />
      </div>
    );
  }
}
