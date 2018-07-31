import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Ticket from '../../components/Ticket/index';
import EmptyResult from '../../components/EmptyResult/index';

export default class UserTicketsPage extends React.Component {
  render() {
    return (
      <section className="container-flex">
        <EmptyResult />
      </section>
    );
  }
}
