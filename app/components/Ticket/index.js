import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Button from '../basic/Button';
import './style.scss';

import messages from './messages';

class Ticket extends React.PureComponent {
  render() {
    return (
      <section className="ticket">
        <div>
          <div className="ticket__title">{this.props.title}</div>
          <div className="ticket__company">{this.props.company}</div>
          <div className="ticket__description">{this.props.description}</div>
          <div className="ticket__time">
            {<FormattedMessage {...messages.time} />}: {this.props.time}
          </div>
        </div>
        <div>
          <div className="ticket__price">
            {<FormattedMessage {...messages.price} />}: {this.props.price} BYN
          </div>
          <div className="ticket__category">
            <h3>business</h3>
          </div>
          <div className="ticket__count">
            <div>{<FormattedMessage {...messages.count} />}</div>
            <input className="ticket-field" />
            <h1 className="actual-count-block">{this.props.count}</h1>
          </div>
          <div className="ticket__add-button-area">
            <Button text={this.props.action} onClick={this.props.onClick} />
          </div>
        </div>
      </section>
    );
  }
}

Ticket.propTypes = {
  title: PropTypes.string,
  company: PropTypes.string,
  description: PropTypes.string,
  time: PropTypes.string,
  price: PropTypes.string,
  count: PropTypes.string,
  action: PropTypes.object,
  onClick: PropTypes.func,
};

export default Ticket;
