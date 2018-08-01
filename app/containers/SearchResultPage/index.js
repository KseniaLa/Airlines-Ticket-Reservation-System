import React from 'react';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'font-awesome/css/font-awesome.min.css';
import SearchBar from '../../components/SearchBar/searchbar';
import Ticket from '../../components/Ticket';
import { makeSelectLocale } from '../LanguageProvider/selectors';

import messages from './messages';
import './style.scss';

import { tickets } from './result.json';

class SearchResultPage extends React.PureComponent {
  componentDidMount() {}

  getData() {
    const list = [];
    const langTickets = tickets[this.props.language];
    langTickets.forEach(element => {
      list.push(
        <Ticket
          title={`${element.from}-${element.to}`}
          company={element.company}
          time={element.time}
          price={element.price}
          count={element.count}
          action={<FormattedMessage {...messages.add} />}
        />,
      );
    });
    return list;
  }

  render() {
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
};

const mapStateToProps = createStructuredSelector({
  language: makeSelectLocale(),
});

export default connect(
  mapStateToProps,
  null,
)(SearchResultPage);
