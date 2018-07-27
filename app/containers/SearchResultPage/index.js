import React from 'react';
import { FormattedMessage } from 'react-intl';
//import messages from './messages';
import SearchBar from '../searchbar';
import Ticket from '../Ticket/index';
import './style.scss';

class SmallSearchBar extends React.Component {
  render() {
    return (
      <div className='search'>
        <SearchBar />
      </div>
    );
  }
}


export default class SearchResultPage extends React.Component {
  render() {
    return (
      <div className='container-flex'>
        <SmallSearchBar />
        <section className='content-flex ticket-area'>
          <Ticket 
          title='Минск-Москва'
          company='aero'
          description='без пересадок'
          date='12.12.2018'
          price='500'
          count='345'/>
          <Ticket />
          </section>
      </div>
    );
  }
}
