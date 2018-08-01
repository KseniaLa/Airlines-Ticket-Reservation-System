import React from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '../../components/basic/Button/button';
import Ticket from '../../components/Ticket';
import './style.scss';

import messages from './messages';

export default class UserBasketPage extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <section className="basket-container">
        <Button text={<FormattedMessage {...messages.submit} />} />
        <Ticket
          title="Минск-Москва"
          company="Аэрофлот"
          time="12.30"
          price="500"
          count="35"
          action={<FormattedMessage {...messages.remove} />}
        />

        <Ticket
          title="Минск-Москва"
          company="Аэрофлот"
          time="12.30"
          price="500"
          count="345"
          action={<FormattedMessage {...messages.remove} />}
        />

        <Ticket
          title="Минск-Москва"
          company="Аэрофлот"
          description="без пересадок"
          time="12.30"
          price="500"
          count="345"
          action={<FormattedMessage {...messages.remove} />}
        />
      </section>
    );
  }
}
