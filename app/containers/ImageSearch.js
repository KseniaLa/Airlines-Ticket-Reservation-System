import React from 'react';
import SearchBar from './searchbar';
import Image from '../components/basic/image';

export default class ImageSearch extends React.Component {
  render() {
    return (
      <div className="image">
        <Image path={this.props.image} style='main-image' />
        <div className='overlay'>
          <h1>Поиск билетов</h1>
          <SearchBar />
        </div>
      </div>
    )
  }
}
