import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import messages from '../../containers/HomePage/messages';

import './style.scss';
import SearchBar from '../../components/SearchBar/searchbar';
import Image from '../../components/basic/image';

class ImageSearch extends React.PureComponent {
  render() {
    return (
      <section className="main-image-block">
        <Image path={this.props.image} className="main-image-block__image" />
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

export default ImageSearch;
