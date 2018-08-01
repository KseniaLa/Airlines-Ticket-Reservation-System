import React from 'react';
import { FormattedMessage } from 'react-intl';
import Menu from '../basic/Menu/menu';
import SocialIcon from '../basic/Icon/socialicon';

import messages from './messages';
import './style.scss';

const Footer = () => (
  <footer className="container-flex footer">
    <div className="content-flex footer__content">
      <Menu
        items={[
          <FormattedMessage {...messages.about} />,
          <FormattedMessage {...messages.advert} />,
          <FormattedMessage {...messages.vacancy} />,
          <FormattedMessage {...messages.help} />,
        ]}
      />
      <div className="footer__social">
        <a href="https://www.vk.com/" target="_blank">
          <SocialIcon icon="fa fa-vk" />
        </a>
        <a href="https://www.facebook.com/" target="_blank">
          <SocialIcon icon="fa fa-facebook-f" />
        </a>
        <a href="https://www.twitter.com/" target="_blank">
          <SocialIcon icon="fa fa-twitter" />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
