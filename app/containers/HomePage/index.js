import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import injectReducer from 'utils/injectReducer';
import reducer from './reducer';

import './style.scss';

import Main from '../main';
import SignIn from '../SignInPage/index';
import FrontPage from '../FrontPage/index';
import SearchResultPage from '../SearchResultPage/index';
import 'font-awesome/css/font-awesome.min.css';


export default class HomePage extends React.PureComponent {
  render() {
    return (
      <div className='container-flex'>
        <SignIn />
        <Main>
          <FrontPage />
        </Main>
      </div>
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
