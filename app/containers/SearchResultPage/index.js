import React from 'react';
import { FormattedMessage } from 'react-intl';
//import messages from './messages';
import SearchBar from '../searchbar';
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

class Ticket extends React.Component {
  render() {
    return (
      <div className='ticket'>
        
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
          <Ticket />
          <Ticket />
          </section>
      </div>
    );
  }
}
