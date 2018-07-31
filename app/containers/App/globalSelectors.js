import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

const makeSelectIsModalVisible = () =>
  createSelector(selectGlobal, globalState => globalState.get('modalVisible'));

const makeSelectIsAuthorized = () =>
  createSelector(selectGlobal, globalState => globalState.get('isAuthorized'));

const makeSelectUser = () =>
  createSelector(selectGlobal, globalState => globalState.get('user'));

const makeSelectIsAdmin = () =>
  createSelector(makeSelectUser(), user => user.get('isAdmin'));

const makeSelectUserName = () =>
  createSelector(makeSelectUser(), user => user.get('name'));

export {
  makeSelectIsModalVisible,
  makeSelectIsAuthorized,
  makeSelectUser,
  makeSelectIsAdmin,
  makeSelectUserName,
};
