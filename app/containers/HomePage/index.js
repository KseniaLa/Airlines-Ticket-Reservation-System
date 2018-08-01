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

import { cities } from './popular.json';

class HomePage extends React.PureComponent {
  getData() {
    const list = [];
    const langCities = cities[this.props.language];
    langCities.forEach(element => {
      list.push(
        <div className="imageste-box__item">
          <TextImageBlock image={cityImage2} text={element.name} />
        </div>,
      );
    });
    return list;
  }

  render() {
    const popularCities = this.getData();
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
};

const mapStateToProps = createStructuredSelector({
  language: makeSelectLocale(),
});

export default connect(
  mapStateToProps,
  null,
)(HomePage);
