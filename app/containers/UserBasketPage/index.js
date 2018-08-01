import React from 'react';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../../components/basic/Button';
import Ticket from '../../components/Ticket';
import EmptyResult from '../../components/EmptyResult';
import { makeSelectLocale } from '../LanguageProvider/selectors';
import './style.scss';

import messages from './messages';
import { tickets } from '../SearchResultPage/result.json';

class UserBasketPage extends React.Component {
  componentDidMount() {}

  getData() {
    const list = [];
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
          action={<FormattedMessage {...messages.remove} />}
        />,
      );
    });
    if (list.length === 0) {
      return <EmptyResult />;
    }
    return list;
  }

  render() {
    const bookedTickets = this.getData();
    return (
      <section className="basket-container">
        <Button text={<FormattedMessage {...messages.submit} />} />
        {bookedTickets}
      </section>
    );
  }
}

UserBasketPage.propTypes = {
  language: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  language: makeSelectLocale(),
});

export default connect(
  mapStateToProps,
  null,
)(UserBasketPage);
