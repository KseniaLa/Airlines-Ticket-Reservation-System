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
          company='Аэрофлот'
          description='без пересадок'
          time='12.30'
          price='500'
          count='345'/>

          <Ticket 
          title='Минск-Москва'
          company='Аэрофлот'
          description='без пересадок'
          time='12.30'
          price='1000'
          count='345'/>

          <Ticket 
          title='Минск-Москва'
          company='Аэрофлот'
          description='без пересадок'
          time='12.30'
          price='500'
          count='5'/>
          </section>
      </div>
    );
  }
}
