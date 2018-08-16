import React from 'react';
import PropTypes from 'prop-types';
import Popup from 'react-popup';
import { FormattedMessage } from 'react-intl';
import Button from '../basic/Button';
import './style.scss';

import messages from './messages';

class Ticket extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isVisible: true, count: 0 };
    this.onButtonClick = this.onButtonClick.bind(this);
    this.updateCount = this.updateCount.bind(this);
  }

  onButtonClick() {
    if (!this.props.checkInput) {
      this.props.onClick(this.props.id, this.state.count);
      if (this.props.hideOnClick) {
        this.setState({ isVisible: false });
      }
      return;
    }
    if (this.state.count !== 0 && this.state.count <= this.props.count) {
      this.props.onClick(this.props.id, this.state.count);
      if (this.props.hideOnClick) {
        this.setState({ isVisible: false });
      }
    } else {
      Popup.alert(
        <FormattedMessage id="app.components.Ticket.invalidcount">
          {error => error}
        </FormattedMessage>,
      );
    }
  }

  updateCount(e) {
    this.setState({ count: e.target.value });
  }

  render() {
    if (!this.state.isVisible) {
      return null;
    }
    return (
      <section className="ticket">
        <div>
          <div className="ticket__title">{this.props.title}</div>
          <div className="ticket__company">{this.props.company}</div>
          <div className="ticket__date">
            {<FormattedMessage {...messages.date} />}: {this.props.date}
          </div>
          <div className="ticket__time">
            {<FormattedMessage {...messages.time} />}: {this.props.time}
          </div>
        </div>
        <div>
          <div className="ticket__price">
            {<FormattedMessage {...messages.price} />}: {this.props.price} BYN
          </div>
          <div className="ticket__category">
            <h3>{this.props.category}</h3>
          </div>
          <div className="ticket__count">
            <div>{<FormattedMessage {...messages.count} />}</div>
            <input
              className="ticket-field"
              onChange={this.updateCount}
              value={this.props.actualCount}
            />
            {this.props.showCount && (
              <h1 className="actual-count-block">{this.props.count}</h1>
            )}
          </div>
          <div className="ticket__add-button-area">
            <Button text={this.props.action} onClick={this.onButtonClick} />
          </div>
        </div>
      </section>
    );
  }
}

Ticket.propTypes = {
  id: PropTypes.number,
  info: PropTypes.object,
  title: PropTypes.string,
  company: PropTypes.string,
  category: PropTypes.string,
  description: PropTypes.string,
  actualCount: PropTypes.number,
  showCount: PropTypes.bool,
  checkInput: PropTypes.bool,
  date: PropTypes.string,
  time: PropTypes.string,
  price: PropTypes.number,
  count: PropTypes.number,
  action: PropTypes.object,
  hideOnClick: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Ticket;
