import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import injectReducer from 'utils/injectReducer';
import reducer from './reducer';

import './style.scss';
import mainImage from './plane.png';
import cityImage from './moscow.jpg';
import ImageSearch from '../ImageSearch';
import Image from '../../components/basic/image';

class TextImageBlock extends React.Component {
  render() {
    return (
      <div className='textimage-block'>
        <Image path={cityImage} style='' />
        <div>dfght</div>
      </div>
    )
  }
}

class TopList extends React.Component {
  render() {
    return (
      <div className='content-flex'>
        <h1>Топ авиакомпаний</h1>
        <Menu items={['компания', 'компания', 'компания', 'компания']} />
      </div>
    )
  }
}

export default class HomePage extends React.PureComponent {
  render() {
    return (
      <div className='container-flex' >
        <ImageSearch image={mainImage} />
        <div className='content-flex top-container'>
          <div className='imgblocks-container'>
            <TextImageBlock />
            <TextImageBlock />
          </div>
          <div className='imgblocks-container'>
            <TextImageBlock />
            <TextImageBlock />
          </div>
          <div className='imgblocks-container'>
            <TextImageBlock />
            <TextImageBlock />
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
