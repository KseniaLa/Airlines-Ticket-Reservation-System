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
import 'font-awesome/css/font-awesome.min.css';

class Menu extends React.Component {

  createList = () => {
    let list = []
    for (let i = 0; i < this.props.items.length; i++) {
      list.push(<li>{this.props.items[i]}</li>)
    }
    return list;
  }

  render() {
    return (
      <ul className='menu'>
        {this.createList()}
      </ul>
    )
  }
}

class SocialIcon extends React.Component {
  render() {
    return (
      <div className='socialicon'><i className={this.props.icon}></i></div>
    )
  }
}

class Footer extends React.Component {
  render() {
    return (
      <footer className='container-flex footer'>
        <div className='content-flex footer__content'>
          <Menu items={['О компании', 'Реклама', 'Вакансии', 'Помощь']} />
          <div className='footer__social'>
            <SocialIcon icon='fa fa-vk' />
            <SocialIcon icon='fa fa-facebook-f' />
            <SocialIcon icon='fa fa-twitter' />
          </div>
        </div>
      </footer>
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
              <SearchBar />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
