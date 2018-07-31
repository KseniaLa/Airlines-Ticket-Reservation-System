import React from 'react';
import SearchBar from '../../components/SearchBar/searchbar';
import Button from '../../components/basic/button';
import Ticket from '../../components/Ticket/index';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import './style.scss';

class SmallSearchBar extends React.Component {
  render() {
    return (
      <div className="search">
        <SearchBar />
      </div>
    );
  }
}

export default class SearchResultPage extends React.Component {
  render() {
    return (
      <section className="container-flex">
        <SmallSearchBar />

        <section className="content-flex ticket-area">
          <div className="button-set">
            <Button text="20" />
            <Button text="50" />
            <Button text="100" />
          </div>
          <Ticket
            title="Минск-Москва"
            company="Аэрофлот"
            time="12.30"
            price="500"
            count="345"
            action={<FormattedMessage {...messages.add} />}
          />

          <Ticket
            title="Минск-Москва"
            company="Аэрофлот"
            time="12.30"
            price="1000"
            count="345"
            action={<FormattedMessage {...messages.add} />}
          />

          <Ticket
            title="Минск-Москва"
            company="Аэрофлот"
            time="12.30"
            price="500"
            count="5"
            action={<FormattedMessage {...messages.add} />}
          />

          <div className="button-set_central">
            <Button text="<" />
            <Button text=">" />
          </div>
        </section>
      </section>
    );
  }
}
