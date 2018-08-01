import React from 'react';
// import Modal from 'react-modal';
import 'font-awesome/css/font-awesome.min.css';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage/index';
import SearchResultPage from '../SearchResultPage';
import AddPage from '../AddPage';
import Header from '../Header/header';
import Footer from '../../components/Footer/footer';
import SignIn from '../SignInPage';
import UserPage from '../UserPage';

import './style.scss';

// Modal.setAppElement('#app');

export default class App extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div className="wrapper">
        <div className="content">
          <Header />
          <SignIn />

          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/results" component={SearchResultPage} />
            <Route path="/user" component={UserPage} />
            <Route exact path="/add" component={AddPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}
