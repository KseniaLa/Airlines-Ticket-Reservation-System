import { createSelector } from 'reselect';

const selectUserPage = state => state.get('userPage');

const makeSelectAreTicketsShown = () =>
  createSelector(selectUserPage, pageState =>
    pageState.get('userTicketsAreShown'),
  );

const makeSelectIsCartShown = () =>
  createSelector(selectUserPage, pageState => pageState.get('userCartIsShown'));

export { makeSelectAreTicketsShown, makeSelectIsCartShown };
