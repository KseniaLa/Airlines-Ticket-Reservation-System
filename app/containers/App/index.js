import React from 'react';
import ReactModal from 'react-modal';
import 'font-awesome/css/font-awesome.min.css';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage/index';
import SearchResultPage from '../SearchResultPage';
import AddPage from '../AddPage';
import Header from '../Header';
import Footer from '../../components/Footer';
import SignIn from '../SignInPage';
import UserPage from '../UserPage';

import './style.scss';

ReactModal.setAppElement('#app');

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div className="wrapper">
        <div className="content">
          <Header onOpenClick={this.handleOpenModal} />
          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="signIn modal"
            onRequestClose={this.handleCloseModal}
            className="modal"
            overlayClassName="overlay"
          >
            <SignIn onCloseClick={this.handleCloseModal} />
          </ReactModal>

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
