import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../../components/basic/Button';
import AddTicketForm from '../../components/AddTicketForm';
import './style.scss';
import { addTicket } from './actions';

import messages from './messages';

class AddPage extends React.Component {
  constructor(props) {
    super(props);
    this.addTicket = this.addTicket.bind(this);
  }

  addTicket(from, to, date, company, flightClass, price, count) {
    this.props.addTicketGroup({
      id: 0,
      from,
      to,
      date,
      company,
      category: flightClass,
      price,
      totalCount: count,
      bookedCount: 0,
    });
  }

  render() {
    return (
      <div className="container-flex">
        <div className="addticket-area">
          <h3>
            <FormattedMessage {...messages.title} />
          </h3>
          <Button text={<FormattedMessage {...messages.addgroup} />} />
          <AddTicketForm onTicketSubmit={this.addTicket} />
          <AddTicketForm />
        </div>
      </div>
    );
  }
}

AddPage.propTypes = {
  addTicketGroup: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    addTicketGroup(ticket) {
      dispatch(addTicket(ticket));
    },
  };
}

const mapStateToProps = createStructuredSelector({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddPage);
