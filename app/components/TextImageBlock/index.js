import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import Image from '../../components/basic/Image/image';

class TextImageBlock extends React.PureComponent {
  render() {
    return (
      <div className="textimage-block">
        <Image path={this.props.image} className="" />
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

export default TextImageBlock;
