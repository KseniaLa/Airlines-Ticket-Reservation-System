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
import { searchForTickets, discardDataReady } from './actions';
import { makeSelectIsDataReceived, makeSelectTickets } from './selectors';
import { makeSelectIsAuthorized } from '../App/selectors';
import messages from './messages';
import './style.scss';

class SearchResultPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.addTicketToCart = this.addTicketToCart.bind(this);
  }

  addTicketToCart(ticket) {
    if (!this.props.isAuthorized) {
      this.props.onNotAuth();
      return;
    }
    if (localStorage.getItem('cartTickets') === null) {
      localStorage.setItem('cartTickets', JSON.stringify([ticket]));
      return;
    }
    const currTickets = JSON.parse(localStorage.getItem('cartTickets'));
    currTickets.push = [].push;
    currTickets.push(ticket);
    localStorage.setItem('cartTickets', JSON.stringify(currTickets));
  }

  getData() {
    const list = [];
    const { tickets } = this.props;
    tickets.forEach(element => {
      const ticket = element[this.props.language];
      list.push(
        <Ticket
          info={element}
          key={ticket.id}
          title={`${ticket.from} - ${ticket.to}`}
          company={ticket.company}
          time={ticket.time}
          price={ticket.price}
          count={ticket.count}
          action={<FormattedMessage {...messages.add} />}
          onClick={this.addTicketToCart}
          hideOnClick={false}
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
          <SearchBar onSearch={this.props.onSearch} />
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
  tickets: PropTypes.array,
  getTickets: PropTypes.func,
  onNotAuth: PropTypes.func,
  onSearch: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    getTickets(search) {
      dispatch(discardDataReady());
      dispatch(searchForTickets(search));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  isAuthorized: makeSelectIsAuthorized(),
  language: makeSelectLocale(),
  tickets: makeSelectTickets(),
  dataReady: makeSelectIsDataReceived(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResultPage);
