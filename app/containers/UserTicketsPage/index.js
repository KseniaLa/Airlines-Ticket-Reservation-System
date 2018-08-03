import React from 'react';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../../components/basic/Spinner';
import Ticket from '../../components/Ticket';
import EmptyResult from '../../components/EmptyResult';
import { makeSelectLocale } from '../LanguageProvider/selectors';
import { getUserTickets } from './actions';
import { makeSelectIsDataReceived, makeSelectUserTickets } from './selectors';
import messages from './messages';

class UserTicketsPage extends React.Component {
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
          title={`${element.from} - ${element.to}`}
          company={element.company}
          time={element.time}
          price={element.price}
          count={element.count}
          action={<FormattedMessage {...messages.undo} />}
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
    return <section className="container-flex">{content}</section>;
  }
}

UserTicketsPage.propTypes = {
  language: PropTypes.string,
  dataReady: PropTypes.bool,
  tickets: PropTypes.object,
  getTickets: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    getTickets() {
      dispatch(getUserTickets());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  language: makeSelectLocale(),
  tickets: makeSelectUserTickets(),
  dataReady: makeSelectIsDataReceived(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserTicketsPage);
