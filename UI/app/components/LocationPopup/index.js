import React from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';

class LocationPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  openModal = () => {
    this.setState({ open: true });
  };
  closeModal = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <button className="button" onClick={this.openModal}>
          Edit
        </button>
        <Popup
          open={this.state.open}
          closeOnDocumentClick
          onClose={this.closeModal}
        >
          <div className="modal">{this.props.children}</div>
        </Popup>
      </div>
    );
  }
}

LocationPopup.propTypes = {
  children: PropTypes.any,
};

export default LocationPopup;
