import React from 'react';
import Menu from './basic/menu';
import SocialIcon from './basic/socialicon';

export default class Footer extends React.Component {
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