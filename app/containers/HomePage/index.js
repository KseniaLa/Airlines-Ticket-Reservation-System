import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import './style.scss';
import mainImage from './img/plane.png';
import cityImage from './img/moscow.jpg';
import cityImage2 from './img/saintp.jpg';
import cityImage3 from './img/istanbul.jpg';
import SearchBar from '../../components/SearchBar/searchbar';
import Image from '../../components/basic/image';

class ImageSearch extends React.Component {
  render() {
    return (
      <section className="main-image-block">
        <Image path={this.props.image} style="main-image-block__image" />
        <div className="main-image-block__overlay">
          <h1>
            <FormattedMessage {...messages.searchtitle} />
          </h1>
          <SearchBar />
        </div>
      </section>
    );
  }
}

ImageSearch.propTypes = {
  image: PropTypes.string,
};

class TextImageBlock extends React.Component {
  render() {
    return (
      <div className="textimage-block">
        <Image path={this.props.image} style="" />
        <div className="textimage-block__title">
          <h3>{this.props.text}</h3>
        </div>
      </div>
    );
  }
}

TextImageBlock.propTypes = {
  image: PropTypes.string,
  text: PropTypes.string,
};

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
