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
import 'font-awesome/css/font-awesome.min.css';


export default class HomePage extends React.PureComponent {
  render() {
    return (
      <div>
        <Header />
        <div className='container-flex'>
          <div className="image">
            <Image path={mainImage} style='main-image' />
            <div className='overlay'>
              <SearchBar />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
