import React from 'react';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Popup from 'react-popup';
import PropTypes from 'prop-types';
import Button from '../../components/basic/Button';
import SuccessMessage from '../../components/basic/SuccessMessage';
import Spinner from '../../components/basic/Spinner';
import Ticket from '../../components/Ticket';
import EmptyResult from '../../components/EmptyResult';
import { makeSelectLocale } from '../LanguageProvider/selectors';
import {
  getCartTickets,
  makeOrder,
  discardState,
  deleteTicketFromCart,
  setDeleteState,
  updateTicketCount,
  discardOrderState,
} from './actions';
import {
  makeSelectIsDataReceived,
  makeSelectTickets,
  makeSelectCartSubmitted,
  makeSelectDeletionOccured,
  makeSelectOrderError,
} from './selectors';
import './style.scss';

import messages from './messages';

class UserBasketPage extends React.Component {
  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.onCancelButtonClick = this.onCancelButtonClick.bind(this);
    this.fetchTickets = this.fetchTickets.bind(this);
    this.onCountUpdate = this.onCountUpdate.bind(this);
  }

  componentDidMount() {
    this.fetchTickets(this.props.language);
  }

  fetchTickets(language) {
    this.props.getTickets(language);
  }

  componentWillUnmount() {
    this.props.discardAll();
  }

  componentDidUpdate() {
    if (this.props.deletionOccured) {
      this.fetchTickets(this.props.language);
      this.props.discardDeletionOccured();
    }
    if (this.props.orderError) {
      Popup.plugins().errorPopup(
        <FormattedMessage id="app.components.UserBasketPage.bookingerror">
          {placeholder => placeholder}
        </FormattedMessage>,
      );
      this.props.discardOrder();
    }
  }

  onButtonClick() {
    this.props.makeUserOrder();
  }

  onCancelButtonClick(ticketId) {
    this.props.deleteTicket(ticketId);
  }

  onCountUpdate(id, count) {
    this.props.updateCount(id, count);
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
          showCount
          checkInput={false}
          action={<FormattedMessage {...messages.remove} />}
          onClick={this.onCancelButtonClick}
          onUpdate={this.onCountUpdate}
          updateCount
        />,
      );
    });
    if (list.length === 0) {
      return <EmptyResult />;
    }
    return (
      <div className="basket-container__tickets-area">
        <Button
          onClick={this.onButtonClick}
          text={<FormattedMessage {...messages.submit} />}
        />
        {list}
      </div>
    );
  }

  render() {
    if (this.props.cartSubmitted) {
      return (
        <section className="basket-container">
          <SuccessMessage text={<FormattedMessage {...messages.success} />} />
        </section>
      );
    }
    const bookedTickets = this.props.dataReady ? this.getData() : <Spinner />;
    return <section className="basket-container">{bookedTickets}</section>;
  }
}

UserBasketPage.propTypes = {
  language: PropTypes.string,
  tickets: PropTypes.array,
  dataReady: PropTypes.bool,
  cartSubmitted: PropTypes.bool,
  deletionOccured: PropTypes.bool,
  orderError: PropTypes.bool,
  getTickets: PropTypes.func,
  makeUserOrder: PropTypes.func,
  discardAll: PropTypes.func,
  deleteTicket: PropTypes.func,
  discardDeletionOccured: PropTypes.func,
  updateCount: PropTypes.func,
  discardOrder: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  language: makeSelectLocale(),
  tickets: makeSelectTickets(),
  dataReady: makeSelectIsDataReceived(),
  cartSubmitted: makeSelectCartSubmitted(),
  deletionOccured: makeSelectDeletionOccured(),
  orderError: makeSelectOrderError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getTickets(language) {
      dispatch(getCartTickets(language));
    },

    makeUserOrder() {
      dispatch(makeOrder());
    },

    discardAll() {
      dispatch(discardState());
    },

    deleteTicket(ticketId) {
      dispatch(deleteTicketFromCart(ticketId));
    },

    discardDeletionOccured() {
      dispatch(setDeleteState(false));
    },

    updateCount(id, count) {
      dispatch(updateTicketCount(id, count));
    },

    discardOrder() {
      dispatch(discardOrderState());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserBasketPage);
