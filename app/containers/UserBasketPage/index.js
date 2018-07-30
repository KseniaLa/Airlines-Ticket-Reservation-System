import React from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '../../components/basic/button';
import Ticket from '../Ticket/index';
import './style.scss';

import messages from './messages';

export default class UserBasketPage extends React.Component {
  render() {
    return (
      <div className="basket-container">
        <Button text={<FormattedMessage {...messages.submit} />} />
        <Ticket
          title="Минск-Москва"
          company="Аэрофлот"
          description="без пересадок"
          time="12.30"
          price="500"
          count="345"
          action="Удалить"
        />

        <Ticket
          title="Минск-Москва"
          company="Аэрофлот"
          description="без пересадок"
          time="12.30"
          price="500"
          count="345"
          action="Удалить"
        />

        <Ticket
          title="Минск-Москва"
          company="Аэрофлот"
          description="без пересадок"
          time="12.30"
          price="500"
          count="345"
          action="Удалить"
        />
      </div>
    );
  }
}
