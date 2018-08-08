import { createSelector } from 'reselect';

const selectCitiesResult = state => state.get('citiesResult');

const makeSelectIsDataReceived = () =>
  createSelector(selectCitiesResult, searchResult =>
    searchResult.get('dataReceived'),
  );

const makeSelectCities = () =>
  createSelector(selectCitiesResult, searchState => searchState.get('data'));

export { makeSelectIsDataReceived, makeSelectCities };
