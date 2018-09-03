import React from 'react';

import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import messages from './messages';

import './style.scss';
import { makeSelectLocale } from '../LanguageProvider/selectors';

// import { makeSelectIsDataReceived, makeSelectCities } from './selectors';
// import { searchForCities, resetCities } from './actions';
import SuccessMessage from '../../components/basic/SuccessMessage';
import ErrorMessage from '../../components/basic/ErrorMessage';

class ConfirmedPage extends React.PureComponent {
  componentDidMount() {}

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
};

// export function mapDispatchToProps(dispatch) {
//   return {
//     getCities(language) {
//       dispatch(searchForCities(language));
//     },

//     discardCities() {
//       dispatch(resetCities());
//     },
//   };
// }

const mapStateToProps = createStructuredSelector({
  language: makeSelectLocale(),
  //   cities: makeSelectCities(),
  //   dataReady: makeSelectIsDataReceived(),
});

export default connect(
  mapStateToProps,
  null,
)(ConfirmedPage);
