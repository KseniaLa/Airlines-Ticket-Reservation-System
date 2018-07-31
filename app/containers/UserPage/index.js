import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { Switch, Route, Link } from 'react-router-dom';
import Button from '../../components/basic/button';
import ActiveButton from '../../components/basic/active_button';
import UserBasketPage from '../UserBasketPage/index';
import UserTicketsPage from '../UserTicketsPage/index';
import { makeSelectUserName } from '../App/globalSelectors';
import { makeSelectAreTicketsShown, makeSelectIsCartShown } from './selectors';
import { setTicketsPageShown, setCartPageShown } from './actions';
import './style.scss';

import messages from './messages';

class UserPage extends React.PureComponent {

  render() {
    const { areTicketsShown, isCartShown } = this.props;
    const ticketsButton = areTicketsShown
      ? [
        <Link to="/user/tickets">
          <ActiveButton
            text={<FormattedMessage {...messages.bookedtickets} />}
            onClick={this.props.showTicketsPage}
          />
        </Link>
      ]
      : [
        <Link to="/user/tickets">
          <Button
            text={<FormattedMessage {...messages.bookedtickets} />}
            onClick={this.props.showTicketsPage}
          />
        </Link>
      ];
    const cartButton = isCartShown
      ? [
        <Link to="/user/basket">
          <ActiveButton
            text={
              <FormattedMessage
                {...messages.basket}
                onClick={this.props.showCartPage}
              />
            }
          />
        </Link>
      ]
      : [
        <Link to="/user/basket">
          <Button
            text={<FormattedMessage {...messages.basket} />} onClick={this.props.showCartPage} />
        </Link>
      ];
    return (
      <div className="container-flex">
        <section className="user-card">
          <h1 className="user-card__name">{this.props.userName}</h1>
          <div className="user-card__navbar">
            <div>
              {ticketsButton}
              {cartButton}
            </div>
          </div>
          <div className="user-card__tickets-area">
            <Switch>
              <Route exact path="/user/tickets" component={UserTicketsPage} />
              <Route exact path="/user/basket" component={UserBasketPage} />
            </Switch>
          </div>
        </section>
      </div>
    );
  }
}

UserPage.propTypes = {
  userName: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
  return {
    showTicketsPage() {
      dispatch(setTicketsPageShown());
    },

    showCartPage() {
      dispatch(setCartPageShown());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  userName: makeSelectUserName(),
  areTicketsShown: makeSelectAreTicketsShown(),
  isCartShown: makeSelectIsCartShown(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserPage);
