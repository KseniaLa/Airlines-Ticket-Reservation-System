import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import './style.scss';

const EmptyResult = () => (
  <div className="empty-block">
    <i className="fa fa-search" />
    <FormattedMessage {...messages.notfound} />
  </div>
);

export default EmptyResult;
