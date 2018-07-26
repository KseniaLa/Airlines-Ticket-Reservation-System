import React from 'react';
import { FormattedMessage } from 'react-intl';


import mainImage from './plane.png';
import cityImage from './moscow.jpg';

import Image from '../../components/basic/image';
import ImageSearch from '../ImageSearch';
import 'font-awesome/css/font-awesome.min.css';

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

export default class FrontPage extends React.Component {

  render() {
    return (
      <div className='container-flex'>
          <ImageSearch image={mainImage}/>
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
      </div>
    );
  }
}
