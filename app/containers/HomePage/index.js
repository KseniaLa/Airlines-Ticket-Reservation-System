import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import injectReducer from 'utils/injectReducer';
import reducer from './reducer';

import './style.scss';
import mainImage from './plane.png';
import cityImage from './moscow.jpg';
import cityImage2 from './saintp.jpg';
import cityImage3 from './istanbul.jpg';
import ImageSearch from '../ImageSearch';
import Image from '../../components/basic/image';

class TextImageBlock extends React.Component {
  render() {
    return (
      <div className='textimage-block'>
        <Image path={this.props.image} style='' />
        <div>dfght</div>
      </div>
    )
  }
}

export default class HomePage extends React.PureComponent {
  render() {
    return (
      <div className='container-flex' >
        <ImageSearch image={mainImage} />
        <div className='content-flex imageset-box'>
          <div className='imageste-box__item'><TextImageBlock image={cityImage}/></div>
          <div className='imageste-box__item'><TextImageBlock image={cityImage2}/></div>
          <div className='imageste-box__item'><TextImageBlock image={cityImage3}/></div>
          <div className='imageste-box__item'><TextImageBlock image={cityImage}/></div>
          <div className='imageste-box__item'><TextImageBlock image={cityImage2}/></div>
          <div className='imageste-box__item'><TextImageBlock image={cityImage3}/></div>
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
