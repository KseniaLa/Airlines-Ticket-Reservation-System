import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { Switch, Route, Link } from 'react-router-dom';
import Button from '../../components/basic/button';
import UserBasketPage from '../UserBasketPage/index';
import UserTicketsPage from '../UserTicketsPage/index';
import { makeSelectUserName } from '../App/selectors/globalSelectors';
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
              <Link to="/user/tickets">
                <Button
                  text={<FormattedMessage {...messages.bookedtickets} />}
                />
              </Link>
              <Link to="/user/basket">
                <Button text={<FormattedMessage {...messages.basket} />} />
              </Link>
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
    showSignIn() {
      dispatch({
        type: 'SHOW_SIGN_MODAL',
        payload: true,
      });
    },
  };
}

const mapStateToProps = createStructuredSelector({
  userName: makeSelectUserName(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserPage);
