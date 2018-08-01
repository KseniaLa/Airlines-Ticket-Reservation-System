import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage/index';
import SearchResultPage from '../SearchResultPage/index';
import AddPage from '../AddPage/index';
import Header from '../Header/header';
import Footer from '../../components/Footer/footer';
import SignIn from '../SignInPage/index';
import UserPage from '../UserPage/index';

import './style.scss';

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
