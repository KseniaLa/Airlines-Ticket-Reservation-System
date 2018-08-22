import React from 'react';

import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import messages from './messages';

import './style.scss';
import mainImage from '../../images/plane.png';
import Spinner from '../../components/basic/Spinner';
import cityImage2 from '../../images/saintp.jpg';
import ImageSearch from '../../components/ImageSearch';
import TextImageBlock from '../../components/TextImageBlock';
import { makeSelectLocale } from '../LanguageProvider/selectors';

import { makeSelectIsDataReceived, makeSelectCities } from './selectors';
import { searchForCities, resetCities } from './actions';

class HomePage extends React.PureComponent {
  componentDidMount() {
    this.props.getCities(this.props.language);
  }

  componentWillUnmount() {
    this.props.discardCities();
  }

  getData() {
    const list = [];
    const { cities } = this.props;
    for (let i = 0; i < cities.length - 1; i += 2) {
      list.push(
        <div key={cities[i].id}>
          <div className="imageset-box__item">
            <TextImageBlock image={cityImage2} text={cities[i].name} />
          </div>
          <div className="imageset-box__item">
            <TextImageBlock image={cityImage2} text={cities[i + 1].name} />
          </div>
        </div>,
      );
    }
    return list;
  }

  render() {
    const popularCities = this.props.dataReady ? this.getData() : <Spinner />;
    return (
      <section className="container-flex">
        <ImageSearch
          image={mainImage}
          onSearch={this.props.onSearch}
          language={this.props.language}
        />
        <div className="content-flex-column">
          <h1>
            <FormattedMessage {...messages.toptitle} />
          </h1>
          <div className="imageset-box">{popularCities}</div>
        </div>
      </section>
    );
  }
}

HomePage.propTypes = {
  language: PropTypes.string,
  dataReady: PropTypes.bool,
  cities: PropTypes.any,
  getCities: PropTypes.func,
  onSearch: PropTypes.func,
  discardCities: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    getCities(language) {
      dispatch(searchForCities(language));
    },

    discardCities() {
      dispatch(resetCities());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  language: makeSelectLocale(),
  cities: makeSelectCities(),
  dataReady: makeSelectIsDataReceived(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
