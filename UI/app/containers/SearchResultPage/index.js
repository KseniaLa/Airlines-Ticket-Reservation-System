import React from 'react';
import { FormattedMessage } from 'react-intl';
import Popup from 'react-popup';
import Pagination from 'react-js-pagination';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'font-awesome/css/font-awesome.min.css';
import SearchBar from '../../components/SearchBar';
import CountButton from '../../components/basic/CountButton';
import Ticket from '../../components/Ticket';
import Spinner from '../../components/basic/Spinner';
import EmptyResult from '../../components/EmptyResult';
import { makeSelectLocale } from '../LanguageProvider/selectors';
import {
  searchForTickets,
  discardDataReady,
  addTicket,
  discardAddState,
} from './actions';
import {
  makeSelectIsDataReceived,
  makeSelectTickets,
  makeSelectIsTicketAddError,
  makeSelectIsTicketAdded,
  makeSelectFrom,
  makeSelectTo,
  makeSelectDate,
  makeSelectClass,
  makeSelectCount,
} from './selectors';
import { makeSelectIsAuthorized } from '../App/selectors';
import messages from './messages';
import './style.scss';
import Button from '../../components/basic/Button';

class SearchResultPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      displayCount: 2,
      activePage: 1,
    };
    this.addTicketToCart = this.addTicketToCart.bind(this);
    this.fetchTickets = this.fetchTickets.bind(this);
    this.handleItemCountChange = this.handleItemCountChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    this.fetchTickets(this.state.displayCount, 1);
  }

  fetchTickets(count, page) {
    const { from, to, date, flightClass, language } = this.props;
    this.props.getTickets(from, to, date, flightClass, language, count, page);
  }

  componentDidUpdate(prevProps) {
    if (this.props.addError) {
      Popup.plugins().errorPopup(
        <FormattedMessage id="app.components.SearchResultsPage.adderror">
          {placeholder => placeholder}
        </FormattedMessage>,
      );
      this.props.discardAdd();
    } else if (this.props.ticketAdded) {
      Popup.plugins().successPopup(
        <FormattedMessage id="app.components.SearchResultsPage.addsuccess">
          {placeholder => placeholder}
        </FormattedMessage>,
      );
      this.props.discardAdd();
    }
    if (
      prevProps.from !== this.props.from ||
      prevProps.to !== this.props.to ||
      prevProps.date !== this.props.date ||
      prevProps.flightClass !== this.props.flightClass
    ) {
      this.fetchTickets(this.state.displayCount, 1);
    }
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
    this.fetchTickets(this.state.displayCount, pageNumber);
  }

  handleItemCountChange(itemsCount) {
    this.setState({ displayCount: itemsCount });
    this.setState({ activePage: 1 });
    this.fetchTickets(itemsCount, 1);
  }

  addTicketToCart(ticket, count) {
    if (!this.props.isAuthorized) {
      this.props.onNotAuth();
      return;
    }
    this.props.addTicketToCart({ ticket, count: +count });
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
          actualCount={0}
          showCount
          checkInput
          action={<FormattedMessage {...messages.add} />}
          onClick={this.addTicketToCart}
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
    return (
      <section className="container-flex">
        <div className="search">
          <SearchBar
            onSearch={this.props.onSearch}
            language={this.props.language}
          />
        </div>
        <section className="content-flex ticket-area">
          <div className="show-count">
            <CountButton
              count={2}
              text="2"
              onClick={this.handleItemCountChange}
            />
            <CountButton
              count={3}
              text="3"
              onClick={this.handleItemCountChange}
            />
            <CountButton
              count={5}
              text="5"
              onClick={this.handleItemCountChange}
            />
            <CountButton
              count={this.props.count}
              text={<FormattedMessage {...messages.all} />}
              onClick={this.handleItemCountChange}
            />
          </div>
          <div className="page-controllers">
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={this.state.displayCount}
              totalItemsCount={this.props.count}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
            />
            <Button text="show all available" />
          </div>
          {content}
        </section>
      </section>
    );
  }
}

SearchResultPage.propTypes = {
  isAuthorized: PropTypes.bool,
  language: PropTypes.string,
  dataReady: PropTypes.bool,
  addError: PropTypes.bool,
  ticketAdded: PropTypes.bool,
  tickets: PropTypes.any,
  getTickets: PropTypes.func,
  onNotAuth: PropTypes.func,
  onSearch: PropTypes.func,
  addTicketToCart: PropTypes.func,
  discardAdd: PropTypes.func,
  from: PropTypes.string,
  to: PropTypes.string,
  date: PropTypes.object,
  flightClass: PropTypes.string,
  count: PropTypes.number,
};

export function mapDispatchToProps(dispatch) {
  return {
    getTickets(from, to, date, flightClass, lang, count, page) {
      dispatch(discardDataReady());
      dispatch(
        searchForTickets(from, to, date, flightClass, lang, count, page),
      );
    },

    addTicketToCart(ticket) {
      dispatch(addTicket(ticket));
    },

    discardAdd() {
      dispatch(discardAddState());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  isAuthorized: makeSelectIsAuthorized(),
  language: makeSelectLocale(),
  tickets: makeSelectTickets(),
  count: makeSelectCount(),
  dataReady: makeSelectIsDataReceived(),
  addError: makeSelectIsTicketAddError(),
  ticketAdded: makeSelectIsTicketAdded(),
  from: makeSelectFrom(),
  to: makeSelectTo(),
  date: makeSelectDate(),
  flightClass: makeSelectClass(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResultPage);
