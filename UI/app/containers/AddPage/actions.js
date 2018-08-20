import {
  TICKETS_ADD_REQUESTED,
  TICKETS_ADD_SUCCEEDED,
  TICKETS_ADD_FAILED,
  FLIGHTS_REQUESTED,
  FLIGHTS_SUCCEEDED,
  FLIGHTS_FAILED,
  CITIES_REQUESTED,
  CITIES_SUCCESS,
  CITIES_ERROR,
  COMPANIES_REQUESTED,
  COMPANIES_SUCCESS,
  COMPANIES_ERROR,
  CITY_ADD_REQUESTED,
  COMPANY_ADD_REQUESTED,
  LOCATION_ADD_SUCCEEDED,
  LOCATION_ADD_FAILED,
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

export function getAllFlights(language) {
  return {
    type: FLIGHTS_REQUESTED,
    payload: language,
  };
}

export function getAllFlightsSuccess(flights) {
  return {
    type: FLIGHTS_SUCCEEDED,
    payload: flights,
  };
}

export function getAllFlightsError() {
  return {
    type: FLIGHTS_FAILED,
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

export function addCity(translations) {
  return {
    type: CITY_ADD_REQUESTED,
    payload: translations,
  };
}

export function addCompany(translations) {
  return {
    type: COMPANY_ADD_REQUESTED,
    payload: translations,
  };
}

export function addLocationSuccess() {
  return {
    type: LOCATION_ADD_SUCCEEDED,
  };
}

export function addLocationError() {
  return {
    type: LOCATION_ADD_FAILED,
  };
}

export function discardState() {
  return {
    type: DISCARD_STATE,
  };
}
