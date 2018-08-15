import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { Switch, Route, NavLink } from 'react-router-dom';
import Button from '../../components/basic/Button';
import Spinner from '../../components/basic/Spinner';
import EmptyResult from '../../components/EmptyResult';
import UserBasketPage from '../UserBasketPage';
import UserTicketsPage from '../UserTicketsPage';
import { makeSelectUserName } from '../App/selectors';
import {
  makeSelectIsIpDataReceived,
  makeSelectUserIpHistory,
} from './selectors';
import './style.scss';
import messages from './messages';
import { getUserIpHistory } from './actions';

class UserPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getUserHistory = this.getUserHistory.bind(this);
  }

  componentDidMount() {
    this.props.getHistory();
  }

  getUserHistory() {
    const list = [];
    const { history } = this.props;
    history.forEach(element => {
      list.push(
        <tr key={element.id}>
          <td>{element.ipAddr}</td>
          <td>{element.date}</td>
        </tr>,
      );
    });
    if (list.length === 0) {
      return <EmptyResult />;
    }
    return list;
  }

  render() {
    const history = this.props.dataReady ? (
      <table className="ip-table">
        <tbody>
          <tr>
            <th>IP</th>
            <th>
              <FormattedMessage {...messages.date} />
            </th>
          </tr>
          {this.getUserHistory()}
        </tbody>
      </table>
    ) : (
      <Spinner />
    );
    return (
      <div className="container-flex">
        <section className="user-card">
          <h1 className="user-card__name">{this.props.userName}</h1>
          <div className="user-card__navbar">
            <div>
              <NavLink to="/user/tickets" activeClassName="selected">
                <Button
                  text={<FormattedMessage {...messages.bookedtickets} />}
                />
              </NavLink>
              <NavLink to="/user/basket" activeClassName="selected">
                <Button text={<FormattedMessage {...messages.basket} />} />
              </NavLink>
            </div>
          </div>
          <div className="user-card__tickets-area">
            <Switch>
              <Route exact path="/user/tickets" component={UserTicketsPage} />
              <Route exact path="/user/basket" component={UserBasketPage} />
            </Switch>
            {history}
          </div>
        </section>
      </div>
    );
  }
}

UserPage.propTypes = {
  userName: PropTypes.string,
  history: PropTypes.array,
  dataReady: PropTypes.bool,
  getHistory: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    getHistory() {
      dispatch(getUserIpHistory());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  userName: makeSelectUserName(),
  history: makeSelectUserIpHistory(),
  dataReady: makeSelectIsIpDataReceived(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserPage);
