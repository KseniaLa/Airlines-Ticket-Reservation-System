import React from 'react';
import Button from '../../components/basic/button';
import Ticket from '../Ticket/index';
import UserBasketPage from '../UserBasketPage/index';
import UserTicketsPage from '../UserTicketsPage/index';
import { Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './style.scss';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

export default class UserPage extends React.Component {
  render() {
    return (
      <div className='container-flex'>
        <section className='user-card'>
          <h1 className='user-card__name'>User Name</h1>
          <div className='user-card__navbar'>
            <div>
    <Link to='/user/tickets'><Button text={<FormattedMessage {...messages.bookedtickets} />} /></Link>
              <Link to='/user/basket'><Button text={<FormattedMessage {...messages.basket} />} /></Link>
            </div>
          </div>
          <div className='user-card__tickets-area'>
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
