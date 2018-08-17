import React from 'react';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../../components/basic/Spinner';
import Ticket from '../../components/Ticket';
import EmptyResult from '../../components/EmptyResult';
import { makeSelectLocale } from '../LanguageProvider/selectors';
import { getUserTickets, cancelUserTicket } from './actions';
import { makeSelectIsDataReceived, makeSelectUserTickets } from './selectors';
import messages from './messages';

class UserTicketsPage extends React.Component {
  constructor(props) {
    super(props);
    this.onCancelClick = this.onCancelClick.bind(this);
  }
  componentDidMount() {
    this.props.getTickets(this.props.language);
  }

  onCancelClick(ticketId) {
    this.props.cancelTicket(ticketId);
  }

  getData() {
    const list = [];
    const { tickets } = this.props;
    tickets.forEach(ticket => {
      const date = new Date(ticket.date);
      list.push(
        <Ticket
          key={ticket.id}
          id={ticket.id}
          title={`${ticket.from} - ${ticket.to}`}
          company={ticket.company}
          category={ticket.category}
          date={`${date.getDate()}.${date.getMonth() +
            1}.${date.getFullYear()}`}
          time={`${date.getHours()} : ${date.getMinutes()}`}
          price={ticket.price}
          count={ticket.totalCount}
          actualCount={ticket.bookedCount}
          showCount={false}
          action={<FormattedMessage {...messages.undo} />}
          onClick={this.onCancelClick}
        />,
      );
    });
    if (list.length === 0) {
      return <EmptyResult />;
    }
    return list;
  }

  render() {
    const content = this.props.dataReady ? this.getData() : <Spinner />;
    return <section className="container-flex">{content}</section>;
  }
}

UserTicketsPage.propTypes = {
  language: PropTypes.string,
  dataReady: PropTypes.bool,
  tickets: PropTypes.array,
  getTickets: PropTypes.func,
  cancelTicket: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    getTickets(lang) {
      dispatch(getUserTickets(lang));
    },

    cancelTicket(ticketId) {
      dispatch(cancelUserTicket(ticketId));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  language: makeSelectLocale(),
  tickets: makeSelectUserTickets(),
  dataReady: makeSelectIsDataReceived(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserTicketsPage);
