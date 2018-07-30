import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import injectReducer from 'utils/injectReducer';
import reducer from './reducer';

import './style.scss';
import mainImage from './img/plane.png';
import cityImage from './img/moscow.jpg';
import cityImage2 from './img/saintp.jpg';
import cityImage3 from './img/istanbul.jpg';
//import ImageSearch from '../ImageSearch';
import SearchBar from '../SearchBar/searchbar';
import Image from '../../components/basic/image';

class ImageSearch extends React.Component {
  render() {
    return (
      <div className="main-image-block">
        <Image path={this.props.image} style='main-image-block__image' />
        <div className='main-image-block__overlay'>
          <h1><FormattedMessage {...messages.searchtitle} /></h1>
          <SearchBar />
        </div>
      </div>
    )
  }
}

class TextImageBlock extends React.Component {
  render() {
    return (
      <div className='textimage-block'>
        <Image path={this.props.image} style='' />
        <div className='textimage-block__title'><h3>{this.props.text}</h3></div>
      </div>
    )
  }
}

export default class HomePage extends React.PureComponent {


  render() {
    return (
      <div className='container-flex' >
        <ImageSearch image={mainImage} />
        <div className='content-flex-column'>
        <h1><FormattedMessage {...messages.toptitle} /></h1>
        <div className='imageset-box'>
          <div className='imageste-box__item'><TextImageBlock image={cityImage} text='City'/></div>
          <div className='imageste-box__item'><TextImageBlock image={cityImage2} text='City'/></div>
          <div className='imageste-box__item'><TextImageBlock image={cityImage3} text='City'/></div>
          <div className='imageste-box__item'><TextImageBlock image={cityImage} text='City'/></div>
          <div className='imageste-box__item'><TextImageBlock image={cityImage2} text='City'/></div>
          <div className='imageste-box__item'><TextImageBlock image={cityImage3} text='City'/></div>
        </div>
        </div>
      </div >
    );
  }
}

/*export function mapDispatchToProps(dispatch) {
  // ...
}

const mapStateToProps = createStructuredSelector({
  // ...
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'homepage', reducer });

export default compose(
  withReducer,
  withConnect,
)(HomePage);*/
