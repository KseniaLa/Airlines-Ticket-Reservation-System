import { fromJS } from 'immutable';
import citiesReducer from '../reducer';
import { getCitiesSuccess, getCitiesError, resetCities } from '../actions';

describe('citiesReducer', () => {
  const initialState = fromJS({
    dataReceived: false,
    data: null,
  });
  it('returns the initial state', () => {
    expect(citiesReducer(undefined, {})).toMatchSnapshot();
  });

  it('sets', () => {
    expect(citiesReducer(initialState, getCitiesSuccess({}))).toMatchSnapshot();
  });

  it('handles', () => {
    expect(citiesReducer(initialState, getCitiesError())).toMatchSnapshot();
  });

  it('the', () => {
    expect(citiesReducer({}, resetCities())).toMatchSnapshot();
  });
});
