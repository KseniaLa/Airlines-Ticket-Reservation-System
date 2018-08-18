import React from 'react';
import { FormattedMessage } from 'react-intl';
import Popup from 'react-popup';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../../components/basic/Spinner';
import Ticket from '../../components/Ticket';
import EmptyResult from '../../components/EmptyResult';
import { makeSelectLocale } from '../LanguageProvider/selectors';
import {
  getUserTickets,
  cancelUserTicket,
  discardCancelState,
  discardState,
} from './actions';
import {
  makeSelectIsDataReceived,
  makeSelectUserTickets,
  makeSelectCancelled,
  makeSelectIsCancelError,
} from './selectors';
import messages from './messages';

class UserTicketsPage extends React.Component {
  constructor(props) {
    super(props);
    this.onCancelClick = this.onCancelClick.bind(this);
    this.fetchOrders = this.fetchOrders.bind(this);
  }

  componentDidMount() {
    this.fetchOrders(this.props.language);
  }

  componentWillUnmount() {
    this.props.discardAll();
  }

  componentDidUpdate() {
    if (this.props.cancelled) {
      Popup.plugins().successPopup(
        <FormattedMessage id="app.components.UserTicketsPage.cancelled">
          {placeholder => placeholder}
        </FormattedMessage>,
      );
      this.props.discardCancel();
      this.fetchOrders(this.props.language);
    } else if (this.props.cancelError) {
      Popup.plugins().errorPopup(
        <FormattedMessage id="app.components.UserTicketsPage.cancelerror">
          {placeholder => placeholder}
        </FormattedMessage>,
      );
      this.props.discardCancel();
    }
  }

  fetchOrders(language) {
    this.props.getTickets(language);
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
  cancelled: PropTypes.bool,
  cancelError: PropTypes.bool,
  tickets: PropTypes.array,
  getTickets: PropTypes.func,
  cancelTicket: PropTypes.func,
  discardCancel: PropTypes.func,
  discardAll: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    getTickets(lang) {
      dispatch(getUserTickets(lang));
    },

    cancelTicket(ticketId) {
      dispatch(cancelUserTicket(ticketId));
    },

    discardCancel() {
      dispatch(discardCancelState());
    },

    discardAll() {
      dispatch(discardState());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  language: makeSelectLocale(),
  tickets: makeSelectUserTickets(),
  dataReady: makeSelectIsDataReceived(),
  cancelled: makeSelectCancelled(),
  cancelError: makeSelectIsCancelError(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserTicketsPage);
