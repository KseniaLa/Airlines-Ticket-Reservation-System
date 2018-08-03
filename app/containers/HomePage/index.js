import React from 'react';

import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import messages from './messages';

import './style.scss';
import mainImage from '../../images/plane.png';
import cityImage2 from '../../images/saintp.jpg';
import ImageSearch from '../../components/ImageSearch';
import TextImageBlock from '../../components/TextImageBlock';
import { makeSelectLocale } from '../LanguageProvider/selectors';

import { makeSelectIsDataReceived, makeSelectCities } from './selectors';
import { searchForCities } from './actions';

class HomePage extends React.PureComponent {
  componentDidMount() {
    this.props.getCities();
  }

  getData() {
    const list = [];
    const { cities } = this.props;
    const langCities = cities[this.props.language];
    for (let i = 0; i < langCities.length - 1; i += 2) {
      list.push(
        <div key={langCities[i].id}>
          <div className="imageste-box__item">
            <TextImageBlock image={cityImage2} text={langCities[i].name} />
          </div>
          <div className="imageste-box__item">
            <TextImageBlock image={cityImage2} text={langCities[i + 1].name} />
          </div>
        </div>,
      );
    }
    return list;
  }

  render() {
    const popularCities = this.props.dataReady ? this.getData() : null;
    return (
      <section className="container-flex">
        <ImageSearch image={mainImage} />
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
  cities: PropTypes.object,
  getCities: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    getCities() {
      dispatch(searchForCities());
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
