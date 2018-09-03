import React from 'react';
import queryString from 'query-string';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import messages from './messages';
import './style.scss';
import { makeSelectLocale } from '../LanguageProvider/selectors';
import {
  makeSelectIsConfirmed,
  makeSelectConfirmationError,
} from './selectors';
import { confirmEmail } from './actions';
import SuccessMessage from '../../components/basic/SuccessMessage';
import ErrorMessage from '../../components/basic/ErrorMessage';

class ConfirmedPage extends React.PureComponent {
  componentDidMount() {
    const parsed = queryString.parse(this.props.location.search);
    this.props.confirm(parsed.token);
  }

  render() {
    return (
      <section className="container-flex">
        <SuccessMessage text={<FormattedMessage {...messages.confirmed} />} />
        <ErrorMessage text={<FormattedMessage {...messages.confirmerror} />} />
      </section>
    );
  }
}

ConfirmedPage.propTypes = {
  language: PropTypes.string,
  location: PropTypes.any,
  confirmed: PropTypes.bool,
  confirmationError: PropTypes.bool,
  confirm: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    confirm(token) {
      dispatch(confirmEmail(token));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  language: makeSelectLocale(),
  confirmed: makeSelectIsConfirmed(),
  confirmationError: makeSelectConfirmationError(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfirmedPage);
