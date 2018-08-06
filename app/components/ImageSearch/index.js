import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import messages from '../../containers/HomePage/messages';

import './style.scss';
import SearchBar from '../SearchBar';
import Image from '../basic/Image';

class ImageSearch extends React.PureComponent {
  render() {
    return (
      <section className="main-image-block">
        <Image path={this.props.image} className="main-image-block__image" />
        <div className="main-image-block__overlay">
          <h1>
            <FormattedMessage {...messages.searchtitle} />
          </h1>
          <SearchBar onSearch={this.props.onSearch} />
        </div>
      </section>
    );
  }
}

ImageSearch.propTypes = {
  image: PropTypes.string,
  onSearch: PropTypes.func,
};

export default ImageSearch;
