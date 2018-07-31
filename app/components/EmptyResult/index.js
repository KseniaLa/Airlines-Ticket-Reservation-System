import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import './style.scss';

export default class EmptyResult extends React.PureComponent {
  render() {
    return (
      <div className="empty-block">
        <i className="fa fa-search" />
        <FormattedMessage {...messages.notfound} />
      </div>
    )
  }
}

