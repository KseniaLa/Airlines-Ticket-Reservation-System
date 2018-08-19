import {
  TICKETS_ADD_REQUESTED,
  TICKETS_ADD_SUCCEEDED,
  TICKETS_ADD_FAILED,
  CITIES_REQUESTED,
  CITIES_SUCCESS,
  CITIES_ERROR,
  COMPANIES_REQUESTED,
  COMPANIES_SUCCESS,
  COMPANIES_ERROR,
  DISCARD_STATE,
} from './constants';

export function addTicket(ticket) {
  return {
    type: TICKETS_ADD_REQUESTED,
    payload: ticket,
  };
}

export function addTicketSuccess() {
  return {
    type: TICKETS_ADD_SUCCEEDED,
  };
}

export function addTicketError() {
  return {
    type: TICKETS_ADD_FAILED,
  };
}

export function getAllCities(language) {
  return {
    type: CITIES_REQUESTED,
    payload: language,
  };
}

export function getAllCitiesSuccess(cities) {
  return {
    type: CITIES_SUCCESS,
    payload: cities,
  };
}

export function getAllCitiesError() {
  return {
    type: CITIES_ERROR,
  };
}

export function getAllCompanies(language) {
  return {
    type: COMPANIES_REQUESTED,
    payload: language,
  };
}

export function getAllCompaniesSuccess(companies) {
  return {
    type: COMPANIES_SUCCESS,
    payload: companies,
  };
}

export function getAllCompaniesError() {
  return {
    type: COMPANIES_ERROR,
  };
}

export function discardState() {
  return {
    type: DISCARD_STATE,
  };
}
