import {
  HISTORY_REQUESTED,
  HISTORY_FETCH_SUCCEEDED,
  HISTORY_FETCH_FAILED,
} from './constants';

export function getUserIpHistory() {
  return {
    type: HISTORY_REQUESTED,
  };
}

export function getUserIpHistorySuccess(result) {
  return {
    type: HISTORY_FETCH_SUCCEEDED,
    payload: result,
  };
}

export function getUserIpHistoryError() {
  return {
    type: HISTORY_FETCH_FAILED,
  };
}
