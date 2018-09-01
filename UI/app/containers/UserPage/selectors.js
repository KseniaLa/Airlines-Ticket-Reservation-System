import { createSelector } from 'reselect';

const selectUserPage = state => state.get('userPage');

const makeSelectIsIpDataReceived = () =>
  createSelector(selectUserPage, userHistory => userHistory.get('ipDataReady'));

const makeSelectUserIpHistory = () =>
  createSelector(selectUserPage, history => history.get('ipData'));

export { selectUserPage, makeSelectIsIpDataReceived, makeSelectUserIpHistory };
