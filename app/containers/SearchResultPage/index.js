import React from 'react';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'font-awesome/css/font-awesome.min.css';
import SearchBar from '../../components/SearchBar';
import Ticket from '../../components/Ticket';
import EmptyResult from '../../components/EmptyResult';
import { makeSelectLocale } from '../LanguageProvider/selectors';
import { searchForTickets } from './actions';
import { makeSelectTickets } from './selectors';

import messages from './messages';
import './style.scss';

// import { tickets } from './result.json';

class SearchResultPage extends React.PureComponent {
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
    this.props.getTickets();
    const result = this.getData();
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
          {result}
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResultPage);
