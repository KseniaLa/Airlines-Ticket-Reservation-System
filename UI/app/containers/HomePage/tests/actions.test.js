import {
  searchForCities,
  getCitiesSuccess,
  getCitiesError,
  resetCities,
} from '../actions';
import {
  RESULT_CITIES_REQUESTED,
  CITIES_FETCH_SUCCEEDED,
  CITIES_FETCH_FAILED,
  RESET_CITIES,
} from '../constants';

describe('HomePage actions', () => {
  describe('searchForCities', () => {
    it('should return en payload', () => {
      expect(searchForCities('en')).toEqual({
        type: RESULT_CITIES_REQUESTED,
        payload: 'en',
      });
    });
  });

  describe('getCitiesSuccess', () => {
    it('should return empty object as a payload', () => {
      expect(getCitiesSuccess({})).toEqual({
        type: CITIES_FETCH_SUCCEEDED,
        payload: {},
      });
    });
  });

  describe('getCitiesError', () => {
    it('should return empty object as a payload', () => {
      expect(getCitiesError()).toEqual({
        type: CITIES_FETCH_FAILED,
      });
    });
  });

  describe('resetCities', () => {
    it('should return RESET_CITIES constant', () => {
      expect(resetCities()).toEqual({
        type: RESET_CITIES,
      });
    });
  });
});
