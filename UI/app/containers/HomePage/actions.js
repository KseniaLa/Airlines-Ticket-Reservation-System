import {
  RESULT_CITIES_REQUESTED,
  CITIES_FETCH_SUCCEEDED,
  CITIES_FETCH_FAILED,
} from './constants';

export function searchForCities(language) {
  return {
    type: RESULT_CITIES_REQUESTED,
    payload: language,
  };
}

export function getCitiesSuccess(result) {
  return {
    type: CITIES_FETCH_SUCCEEDED,
    payload: result,
  };
}

export function getCitiesError() {
  return {
    type: CITIES_FETCH_FAILED,
  };
}
