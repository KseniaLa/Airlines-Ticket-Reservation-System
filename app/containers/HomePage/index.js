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

import mainImage from './plane.png';
import cityImage from './moscow.jpg';

import Header from '../header';
import SearchBar from '../searchbar';
import Image from '../../components/basic/image';
import Footer from '../footer';
import Main from '../main';
import Menu from '../../components/basic/menu';
import SignIn from '../SignInPage/index';
import ImageSearch from '../ImageSearch';
import 'font-awesome/css/font-awesome.min.css';

class TextImageBlock extends React.Component {
  render() {
    return (
      <div className='textimage-block'>
        <Image path={cityImage} style='' />
        <div>dfght</div>
      </div>
    )
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
        <SignIn />
        <Main>
          <ImageSearch image={mainImage}/>
          <div className='content-flex top-container'>
            <div className='imgblocks-container'>
              <TextImageBlock />
              <TextImageBlock />
            </div>
            <div className='imgblocks-container'>
              <TextImageBlock />
              <TextImageBlock /> 
            </div>
            <div className='imgblocks-container'>
              <TextImageBlock />
              <TextImageBlock />
            </div>

          </div>
        </Main>
        <Footer />
      </div>
    );
  }
}
