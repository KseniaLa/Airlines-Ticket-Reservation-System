import { createSelector } from 'reselect';

const selectRoute = state => state.get('route');

const selectGlobal = state => state.get('global');

const makeSelectLocation = () =>
  createSelector(selectRoute, routeState => routeState.get('location').toJS());

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
  makeSelectLocation,
  makeSelectIsModalVisible,
  makeSelectIsAuthorized,
  makeSelectUser,
  makeSelectIsAdmin,
  makeSelectUserName,
};
