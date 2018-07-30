import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Title from '../../components/basic/title';
import Button from '../../components/basic/button';
import SocialIcon from '../../components/basic/socialicon';
import injectReducer from 'utils/injectReducer';
import reducer from '../reducers/autorization-reducer';
import { Link } from 'react-router-dom';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

class Header extends React.Component {

  render() {
    return (
      <header className='container-flex header'>
        <div className='content-flex header__content'>
          <Link to='/'><Title style='base-title site-name' text='Airlines' /></Link>
          <div className='header__options'>
            <Link to='/user/tickets'><SocialIcon icon='fa fa-user' /></Link>
            <Link to='/add'><SocialIcon icon='fa fa-plus' /></Link>
            <Link to='/user/basket'><SocialIcon icon='fa fa-shopping-cart' /></Link>
            <Button text={<FormattedMessage {...messages.enter} />} onClick={this.props.showSignIn} />
          </div>
        </div>
      </header>
    )
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    showSignIn: function () {
      alert('Hello!');
      dispatch({
        type: 'SHOW_SIGN_MODAL',
        payload: true
      });
    }
  }
}

/*const visibleSelector = (store) => store.modalVisible;
const mapStateToProps = createStructuredSelector({
  visible: visibleSelector
});*/
const mapStateToProps = (state) => {
  return {
    visible: state.modalVisible
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'auth', reducer });

export default compose(
  withReducer,
  withConnect,
)(Header);
