import React from 'react';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../../components/basic/Button';
import Spinner from '../../components/basic/Spinner';
import Ticket from '../../components/Ticket';
import EmptyResult from '../../components/EmptyResult';
import { makeSelectLocale } from '../LanguageProvider/selectors';
import {
  getCartTickets,
  makeOrder,
  discardOrderSucceeded,
  deleteTicketFromCart,
} from './actions';
import {
  makeSelectIsDataReceived,
  makeSelectTickets,
  makeSelectCartSubmitted,
} from './selectors';
import './style.scss';

import messages from './messages';

class UserBasketPage extends React.Component {
  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.onCancelButtonClick = this.onCancelButtonClick.bind(this);
  }

  componentDidMount() {
    this.props.getTickets(this.props.language);
  }

  componentWillUnmount() {
    this.props.hideSuccessBar();
  }

  onButtonClick() {
    this.props.makeUserOrder();
  }

  onCancelButtonClick(ticketId) {
    this.props.deleteTicket(ticketId);
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
          action={<FormattedMessage {...messages.remove} />}
          onClick={this.onCancelButtonClick}
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
      return <section className="basket-container">ok</section>;
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
  getTickets: PropTypes.func,
  makeUserOrder: PropTypes.func,
  hideSuccessBar: PropTypes.func,
  deleteTicket: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  language: makeSelectLocale(),
  tickets: makeSelectTickets(),
  dataReady: makeSelectIsDataReceived(),
  cartSubmitted: makeSelectCartSubmitted(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getTickets(language) {
      dispatch(getCartTickets(language));
    },

    makeUserOrder() {
      dispatch(makeOrder());
    },

    hideSuccessBar() {
      dispatch(discardOrderSucceeded());
    },

    deleteTicket(ticketId) {
      dispatch(deleteTicketFromCart(ticketId));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserBasketPage);
