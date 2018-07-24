/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import './style.scss';
import mainImage from './plane_main.jpg';
import Header from '../header';
import SearchBar from '../searchbar';
import Image from '../basic/image';
import Footer from '../footer';
import Menu from '../basic/menu';
import 'font-awesome/css/font-awesome.min.css';

class TextImageBlock extends React.Component {
  render() {

  }
}

class TopList extends React.Component {
  render() {
    return (
      <div className='content-flex'>
        <h1>Топ авиакомпаний</h1>
        <Menu items={['компания', 'компания', 'компания', 'компания']} />
      </div>
    )
  }
}

export default class HomePage extends React.PureComponent {
  render() {
    return (
      <div>
        <Header />
        <div className='container-flex'>
          <div className="image">
            <Image path={mainImage} style='main-image' />
            <div className='overlay'>
              <h1>Поиск билетов</h1>
              <SearchBar />
            </div>
          </div>
          <TopList />
        </div>
        <Footer />
      </div>
    );
  }
}
