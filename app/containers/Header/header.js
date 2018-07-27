import React from 'react';
import Title from '../../components/basic/title';
import Button from '../../components/basic/button';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import {Link} from 'react-router-dom';

export default class Header extends React.Component {
  showSignIn() {
    alert("hello");
  }

  render() {
    return (
      <header className='container-flex header'>
        <div className='content-flex header__content'>
          <Link to='/'><Title style='base-title site-name' text='Airlines' /></Link>
          <div className='header__options'>
            <Link to='/signin'><Button text='Войти' onClick={this.showSignIn}/></Link>
          </div>
        </div>
      </header>
    )
  }
}

/*export function mapDispatchToProps(dispatch) {
  return {
    showSignIn: function() {
      dispatch({
        type: 'SHOW_SIGN_MODAL',
        modalVisible: true
      });
    }
  }
}

const mapStateToProps = createStructuredSelector({
  // ...
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'header', reducer });

export default compose(
  withReducer,
  withConnect,
)(Header);*/
