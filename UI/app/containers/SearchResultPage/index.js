import React from 'react';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'font-awesome/css/font-awesome.min.css';
import SearchBar from '../../components/SearchBar';
import Ticket from '../../components/Ticket';
import Spinner from '../../components/basic/Spinner';
import EmptyResult from '../../components/EmptyResult';
import { makeSelectLocale } from '../LanguageProvider/selectors';
import { searchForTickets, discardDataReady, addTicket } from './actions';
import {
  makeSelectIsDataReceived,
  makeSelectTickets,
  makeSelectIsTicketAddError,
} from './selectors';
import { makeSelectIsAuthorized } from '../App/selectors';
import messages from './messages';
import './style.scss';

class SearchResultPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.addTicketToCart = this.addTicketToCart.bind(this);
  }

  componentDidUpdate() {
    if (this.props.addError) {
      alert("add error");
    }
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
          showCount
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
          <div className="button-set">
            <div>20</div>
            <div>50</div>
            <div>100</div>
          </div>
          {content}
          <div className="button-set central">
            <div>
              <i className="fa fa-chevron-left" />
            </div>
            <div>
              <i className="fa fa-chevron-right" />
            </div>
          </div>
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
  tickets: PropTypes.array,
  getTickets: PropTypes.func,
  onNotAuth: PropTypes.func,
  onSearch: PropTypes.func,
  addTicketToCart: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    getTickets(search) {
      dispatch(discardDataReady());
      dispatch(searchForTickets(search));
    },

    addTicketToCart(ticket) {
      dispatch(addTicket(ticket));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  isAuthorized: makeSelectIsAuthorized(),
  language: makeSelectLocale(),
  tickets: makeSelectTickets(),
  dataReady: makeSelectIsDataReceived(),
  addError: makeSelectIsTicketAddError(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResultPage);
