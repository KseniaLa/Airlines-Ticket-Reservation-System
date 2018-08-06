import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { Switch, Route, NavLink } from 'react-router-dom';
import Button from '../../components/basic/Button';
import UserBasketPage from '../UserBasketPage';
import UserTicketsPage from '../UserTicketsPage';
import { makeSelectUserName } from '../App/selectors';
import './style.scss';
import messages from './messages';

class UserPage extends React.PureComponent {
  render() {
    return (
      <div className="container-flex">
        <section className="user-card">
          <h1 className="user-card__name">{this.props.userName}</h1>
          <div className="user-card__navbar">
            <div>
              <NavLink to="/user/tickets" activeClassName="selected">
                <Button
                  text={<FormattedMessage {...messages.bookedtickets} />}
                />
              </NavLink>
              <NavLink to="/user/basket" activeClassName="selected">
                <Button text={<FormattedMessage {...messages.basket} />} />
              </NavLink>
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

const mapStateToProps = createStructuredSelector({
  userName: makeSelectUserName(),
});

export default connect(
  mapStateToProps,
  null,
)(UserPage);
