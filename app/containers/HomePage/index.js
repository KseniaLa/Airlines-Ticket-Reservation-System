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

import Header from '../header';
import Footer from '../footer';
import Main from '../main';
import SignIn from '../SignInPage/index';
import FrontPage from '../FrontPage/index';
import SearchResultPage from '../SearchResultPage/index';
import 'font-awesome/css/font-awesome.min.css';


export default class HomePage extends React.PureComponent {
  render() {
    return (
      <div className='container-flex'>
        <Header />
        {/**/}<SignIn />
        <Main>
          <FrontPage />
          {/*<SearchResultPage />*/}
        </Main>
        <Footer />
      </div>
    );
  }
}
