import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import './style.scss';
import mainImage from './img/plane.png';
import cityImage from './img/moscow.jpg';
import cityImage2 from './img/saintp.jpg';
import cityImage3 from './img/istanbul.jpg';
import ImageSearch from '../../components/ImageSearch';
import TextImageBlock from '../../components/TextImageBlock';

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  render() {
    return (
      <section className="container-flex">
        <ImageSearch image={mainImage} />
        <div className="content-flex-column">
          <h1>
            <FormattedMessage {...messages.toptitle} />
          </h1>
          <div className="imageset-box">
            <div className="imageste-box__item">
              <TextImageBlock image={cityImage} text="City" />
            </div>
            <div className="imageste-box__item">
              <TextImageBlock image={cityImage2} text="City" />
            </div>
            <div className="imageste-box__item">
              <TextImageBlock image={cityImage3} text="City" />
            </div>
            <div className="imageste-box__item">
              <TextImageBlock image={cityImage} text="City" />
            </div>
            <div className="imageste-box__item">
              <TextImageBlock image={cityImage2} text="City" />
            </div>
            <div className="imageste-box__item">
              <TextImageBlock image={cityImage3} text="City" />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
