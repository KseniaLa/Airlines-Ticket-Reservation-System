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
import { searchForTickets } from './actions';
import { makeSelectIsDataReceived, makeSelectTickets } from './selectors';

import messages from './messages';
import './style.scss';

class SearchResultPage extends React.PureComponent {
  componentDidMount() {
    this.props.getTickets();
  }

  getData() {
    const list = [];
    const { tickets } = this.props;
    const langTickets = tickets[this.props.language];
    langTickets.forEach(element => {
      list.push(
        <Ticket
          key={element.id}
          title={`${element.from}-${element.to}`}
          company={element.company}
          time={element.time}
          price={element.price}
          count={element.count}
          action={<FormattedMessage {...messages.add} />}
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
          <SearchBar />
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
  language: PropTypes.string,
  dataReady: PropTypes.bool,
  tickets: PropTypes.object,
  getTickets: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    getTickets() {
      dispatch(searchForTickets());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  language: makeSelectLocale(),
  tickets: makeSelectTickets(),
  dataReady: makeSelectIsDataReceived(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResultPage);
