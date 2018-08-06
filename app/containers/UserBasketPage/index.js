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

class UserBasketPage extends React.Component {
  componentDidMount() {}

  onButtonClick() {}

  getData() {
    const list = [];
    const tickets = JSON.parse(localStorage.getItem('cartTickets'));
    if (!tickets) {
      return <EmptyResult />;
    }
    tickets.forEach(element => {
      const ticket = element[0][this.props.language];
      list.push(
        <Ticket
          key={ticket.id}
          title={`${ticket.from}-${ticket.to}`}
          company={ticket.company}
          time={ticket.time}
          price={ticket.price}
          count={ticket.count}
          actualCount={+element[1]}
          action={<FormattedMessage {...messages.remove} />}
          onClick={this.onButtonClick}
          hideOnClick
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
