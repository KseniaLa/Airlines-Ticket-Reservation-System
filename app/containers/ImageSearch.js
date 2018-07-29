import React from 'react';
import SearchBar from './searchbar';
import Image from '../components/basic/image';

export default class ImageSearch extends React.Component {
  render() {
    return (
      <div className="main-image-block">
        <Image path={this.props.image} style='main-image-block__image' />
        <div className='main-image-block__overlay'>
          <h1>Поиск билетов</h1>
          <SearchBar />
        </div>
      </div>
    )
  }
}
