import {
  TICKETS_ADD_REQUESTED,
  TICKETS_ADD_SUCCEEDED,
  TICKETS_ADD_FAILED,
  FLIGHT_ADD_REQUESTED,
  FLIGHT_ADD_SUCCEEDED,
  FLIGHT_ADD_FAILED,
  FLIGHTS_REQUESTED,
  FLIGHTS_SUCCEEDED,
  FLIGHTS_FAILED,
  CITIES_LIST_REQUESTED,
  CITIES_LIST_SUCCESS,
  CITIES_LIST_ERROR,
  CITIES_REQUESTED,
  CITIES_SUCCESS,
  CITIES_ERROR,
  COMPANIES_REQUESTED,
  COMPANIES_SUCCESS,
  COMPANIES_ERROR,
  CITY_UPDATE_REQUESTED,
  CITY_DELETE_REQUESTED,
  CITY_DELETED,
  CITY_ADD_REQUESTED,
  COMPANY_ADD_REQUESTED,
  LOCATION_ADD_SUCCEEDED,
  LOCATION_ADD_FAILED,
  LANGUAGE_ADD_REQUESTED,
  LANGUAGE_ADD_SUCCEEDED,
  LANGUAGE_ADD_FAILED,
  DISCARD_STATE,
  LANGUAGES_REQUESTED,
  LANGUAGES_SUCCESS,
  LANGUAGES_ERROR,
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

export function addFlight(flight) {
  return {
    type: FLIGHT_ADD_REQUESTED,
    payload: flight,
  };
}

export function addFlightSuccess() {
  return {
    type: FLIGHT_ADD_SUCCEEDED,
  };
}

export function addFlightError() {
  return {
    type: FLIGHT_ADD_FAILED,
  };
}

export function getCitiesList(language) {
  return {
    type: CITIES_LIST_REQUESTED,
    payload: language,
  };
}

export function getCitiesListSuccess(cities) {
  return {
    type: CITIES_LIST_SUCCESS,
    payload: cities,
  };
}

export function getCitiesListError() {
  return {
    type: CITIES_LIST_ERROR,
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

export function updateCity(id, translations) {
  return {
    type: CITY_UPDATE_REQUESTED,
    id,
    payload: translations,
  };
}

export function deleteCity(id) {
  return {
    type: CITY_DELETE_REQUESTED,
    payload: id,
  };
}

export function deleteCitySuccess() {
  return {
    type: CITY_DELETED,
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

export function addLanguage(language) {
  return {
    type: LANGUAGE_ADD_REQUESTED,
    payload: language,
  };
}

export function addLanguageSuccess() {
  return {
    type: LANGUAGE_ADD_SUCCEEDED,
  };
}

export function addLanguageError() {
  return {
    type: LANGUAGE_ADD_FAILED,
  };
}

export function getLanguages() {
  return {
    type: LANGUAGES_REQUESTED,
  };
}

export function getLanguagesSuccess(cities) {
  return {
    type: LANGUAGES_SUCCESS,
    payload: cities,
  };
}

export function getLanguagesError() {
  return {
    type: LANGUAGES_ERROR,
  };
}

export function discardState() {
  return {
    type: DISCARD_STATE,
  };
}
