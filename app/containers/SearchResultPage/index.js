import React from 'react';
import { FormattedMessage } from 'react-intl';
import 'font-awesome/css/font-awesome.min.css';
import SearchBar from '../../components/SearchBar/searchbar';
import Ticket from '../../components/Ticket/index';

import messages from './messages';
import './style.scss';

export default class SearchResultPage extends React.PureComponent {
  componentDidMount() {}
  render() {
    return (
      <section className="container-flex">
        <div className="search">
          <SearchBar />
        </div>
        <section className="content-flex ticket-area">
          <div className="button-set">
            <div>20</div>
            <div>50</div>
            <div>100</div>
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

          <div className="button-set central">
            <div>
              <i className="fa fa-chevron-left" />
            </div>
            <div>
              <i className="fa fa-chevron-right" />
            </div>
          </div>
        </section>
      </section>
    );
  }
}
