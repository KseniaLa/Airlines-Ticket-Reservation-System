import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Popup from 'react-popup';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import Spinner from '../../components/basic/Spinner';
import ErrorMessage from '../../components/basic/ErrorMessage';
import LocationPopup from '../../components/LocationPopup';
import AddTicketForm from '../../components/AddTicketForm';
import AddLocationForm from '../../components/AddLocationForm';
import AddLocation from '../../components/AddLocation';
import AddLanguageForm from '../../components/AddLanguageForm';
import AddFlightForm from '../../components/AddFlightForm';
import { makeSelectLocale } from '../LanguageProvider/selectors';
import { makeSelectIsAuthorized, makeSelectIsAdmin } from '../App/selectors';
import './style.scss';
import {
  addTicket,
  addFlight,
  getAllCities,
  discardState,
  getAllCompanies,
  addCity,
  addCompany,
  getAllFlights,
  getLanguages,
  addLanguage,
  getCitiesList,
  updateCity,
  updateCompany,
  deleteCity,
  deleteCompany,
  deleteLang,
} from './actions';
import {
  makeSelectAdded,
  makeSelectAddError,
  makeSelectIsCitiesDataReceived,
  makeSelectCities,
  makeSelectIsCompaniesDataReceived,
  makeSelectCompanies,
  makeSelectIsFlightsDataReceived,
  makeSelectFlights,
  makeSelectIsLanguagesDataReceived,
  makeSelectLanguages,
  makeSelectIsCityListReceived,
  makeSelectCityList,
  makeSelectDeleted,
} from './selectors';

import messages from './messages';
import Button from '../../components/basic/Button';

class AddPage extends React.Component {
  constructor(props) {
    super(props);
    this.addTicket = this.addTicket.bind(this);
    this.addFlight = this.addFlight.bind(this);
    this.getCitiesList = this.getCitiesList.bind(this);
    this.getFlightsList = this.getFlightsList.bind(this);
    this.addCity = this.addCity.bind(this);
    this.addCompany = this.addCompany.bind(this);
    this.addLanguage = this.addLanguage.bind(this);
    this.getData = this.getData.bind(this);
    this.deleteCity = this.deleteCity.bind(this);
    this.deleteCompany = this.deleteCompany.bind(this);
    this.deleteLang = this.deleteLang.bind(this);
  }

  componentDidMount() {
    if (this.props.isAuthorized && this.props.isAdmin) {
      this.getData();
    }
  }

  componentWillUnmount() {
    this.props.discardAll();
  }

  getSuccessMsg() {
    Popup.plugins().successPopup(
      <FormattedMessage id="app.components.AddPage.added">
        {msg => msg}
      </FormattedMessage>,
    );
  }

  getErrorMsg() {
    Popup.plugins().errorPopup(
      <FormattedMessage id="app.components.AddPage.adderror">
        {msg => msg}
      </FormattedMessage>,
    );
  }

  componentDidUpdate() {
    if (this.props.added) {
      this.getSuccessMsg();
      this.props.discardAll();
      this.getData();
    } else if (this.props.addError) {
      this.getErrorMsg();
      this.props.discardAll();
      this.getData();
    }

    if (this.props.deleted) {
      this.props.discardAll();
      this.getData();
    }
  }

  getData() {
    this.props.getCities(this.props.language);
    this.props.getCompanies(this.props.language);
    this.props.getFlights(this.props.language);
    this.props.getAvailableLanguages();
    this.props.getCityList(this.props.language);
  }

  addTicket(flightId, companyId, flightClass, price, count) {
    this.props.addTicketGroup({
      flightId,
      companyId,
      category: flightClass,
      price,
      count,
    });
  }

  addFlight(from, to, date) {
    this.props.addNewFlight({
      id: 0,
      from,
      to,
      date,
    });
  }

  addCity(translations) {
    this.props.addNewCity(translations);
  }

  addCompany(translations) {
    this.props.addNewCompany(translations);
  }

  addLanguage(language) {
    this.props.addNewLanguage(language);
  }

  deleteCity(id) {
    this.props.deleteCurrCity(id);
  }

  deleteCompany(id) {
    this.props.deleteCurrCompany(id);
  }

  deleteLang(name) {
    this.props.deleteCurrLang(name);
  }

  getCitiesList() {
    const languages = this.props.langReceived
      ? this.getLangList()
      : { names: [], values: [] };
    const list = [];
    const { cities } = this.props;
    cities.forEach((element, index) => {
      list.push(
        <div className="list-item" key={index}>
          <div className="list-item__name">{element.name}</div>
          <div className="edit-set">
            <LocationPopup text={<FormattedMessage {...messages.edit} />}>
              <AddLocation
                id={element.id}
                translations={element.translations}
                lang={languages.names}
                values={languages.values}
                langTitle={
                  <FormattedMessage id="app.components.AddPage.language">
                    {placeholder => placeholder}
                  </FormattedMessage>
                }
                onSave={this.props.updateCityTranslations}
              />
            </LocationPopup>
            <Button
              text={<FormattedMessage {...messages.delete} />}
              onClick={e => this.deleteCity(element.id, e)}
            />
          </div>
        </div>,
      );
    });
    return list;
  }

  getCompaniesList() {
    const languages = this.props.langReceived
      ? this.getLangList()
      : { names: [], values: [] };
    const list = [];
    const { companies } = this.props;
    companies.forEach((element, index) => {
      list.push(
        <div className="list-item" key={index}>
          <div className="list-item__name">{element.name}</div>
          <div className="edit-set">
            <LocationPopup text={<FormattedMessage {...messages.edit} />}>
              <AddLocation
                id={element.id}
                translations={element.translations}
                lang={languages.names}
                values={languages.values}
                langTitle={
                  <FormattedMessage id="app.components.AddPage.language">
                    {placeholder => placeholder}
                  </FormattedMessage>
                }
                onSave={this.props.updateCompanyTranslations}
              />
            </LocationPopup>
            <Button
              text={<FormattedMessage {...messages.delete} />}
              onClick={e => this.deleteCompany(element.id, e)}
            />
          </div>
        </div>,
      );
    });
    return list;
  }

  getFlightsList() {
    const nameList = [];
    const valueList = [];
    const { flights } = this.props;
    flights.forEach(element => {
      nameList.push(`${element.from} - ${element.to}  ${element.date}`);
      valueList.push(element.id);
    });
    return { names: nameList, values: valueList };
  }

  getList(list) {
    const nameList = [];
    const valueList = [];
    list.forEach(element => {
      nameList.push(element.name);
      valueList.push(element.id);
    });
    return { names: nameList, values: valueList };
  }

  getLangList() {
    const nameList = [];
    const valueList = [];
    const { languages } = this.props;
    languages.forEach(element => {
      nameList.push(element);
      valueList.push(element);
    });
    return { names: nameList, values: valueList };
  }

  getLangEditList() {
    const list = [];
    const { languages } = this.props;
    languages.forEach((element, index) => {
      list.push(
        <div className="list-item" key={index}>
          {element}
          <div className="edit-set">
            <Button
              text={<FormattedMessage {...messages.delete} />}
              onClick={e => this.deleteLang(element, e)}
            />
          </div>
        </div>,
      );
    });
    return list;
  }

  render() {
    if (!this.props.isAuthorized || !this.props.isAdmin) {
      return (
        <div className="container-flex">
          <div className="error-message-container">
            <ErrorMessage text={<FormattedMessage {...messages.forbidden} />} />
          </div>
        </div>
      );
    }
    const flights = this.props.flightsReceived
      ? this.getFlightsList()
      : { names: [], values: [] };
    const languages = this.props.langReceived
      ? this.getLangList()
      : { names: [], values: [] };
    const langedit = this.props.langReceived ? (
      this.getLangEditList()
    ) : (
      <Spinner />
    );
    const cityList = this.props.cityListReceived
      ? this.getList(this.props.cityList)
      : { names: [], values: [] };
    const companyList = this.props.companiesReceived
      ? this.getList(this.props.companies)
      : { names: [], values: [] };
    const cities = this.props.citiesReceived ? (
      this.getCitiesList()
    ) : (
      <Spinner />
    );
    const companies = this.props.companiesReceived ? (
      this.getCompaniesList()
    ) : (
      <Spinner />
    );
    return (
      <div className="container-flex">
        <div className="addticket-area">
          <h3>
            <FormattedMessage {...messages.title} />
          </h3>
          <h4>
            <FormattedMessage {...messages.addlanguage} />
          </h4>

          <div className="list-container">
            <AddLanguageForm onSubmit={this.addLanguage} />
            <div className="list-container__list--single">{langedit}</div>
          </div>

          <div className="list-container">
            <div className="list-container__block">
              <h4>
                <FormattedMessage {...messages.addcity} />
              </h4>
              <div className="list-container__list">
                <div>{cities}</div>
              </div>
              <AddLocationForm
                onSubmit={this.addCity}
                lang={languages.names}
                values={languages.values}
                title={<FormattedMessage {...messages.addcity} />}
                langTitle={
                  <FormattedMessage id="app.components.AddPage.language">
                    {placeholder => placeholder}
                  </FormattedMessage>
                }
              />
            </div>
            <div className="list-container__block">
              <h4>
                <FormattedMessage {...messages.addcompany} />
              </h4>
              <div className="list-container__list">
                <div>{companies}</div>
              </div>
              <AddLocationForm
                onSubmit={this.addCompany}
                lang={languages.names}
                values={languages.values}
                title={<FormattedMessage {...messages.addcompany} />}
                langTitle={
                  <FormattedMessage id="app.components.AddPage.language">
                    {placeholder => placeholder}
                  </FormattedMessage>
                }
              />
            </div>
          </div>

          <h4>
            <FormattedMessage {...messages.addflight} />
          </h4>
          <AddFlightForm
            onFlightSubmit={this.addFlight}
            language={this.props.language}
            cities={cityList.names}
            values={cityList.values}
            fromTitle={
              <FormattedMessage id="app.components.AddPage.fromfield">
                {placeholder => placeholder}
              </FormattedMessage>
            }
            toTitle={
              <FormattedMessage id="app.components.AddPage.tofield">
                {placeholder => placeholder}
              </FormattedMessage>
            }
          />
          <h4>
            <FormattedMessage {...messages.addticket} />
          </h4>
          <AddTicketForm
            onTicketSubmit={this.addTicket}
            flights={flights.names}
            fvalues={flights.values}
            companies={companyList.names}
            cvalues={companyList.values}
            flightTitle={
              <FormattedMessage id="app.components.AddPage.chooseflight">
                {placeholder => placeholder}
              </FormattedMessage>
            }
            companyTitle={
              <FormattedMessage id="app.components.AddPage.company">
                {placeholder => placeholder}
              </FormattedMessage>
            }
          />

          <AddTicketForm
            onTicketSubmit={this.addTicket}
            flights={flights.names}
            fvalues={flights.values}
            companies={companyList.names}
            cvalues={companyList.values}
            flightTitle={
              <FormattedMessage id="app.components.AddPage.chooseflight">
                {placeholder => placeholder}
              </FormattedMessage>
            }
            companyTitle={
              <FormattedMessage id="app.components.AddPage.company">
                {placeholder => placeholder}
              </FormattedMessage>
            }
          />
        </div>
      </div>
    );
  }
}

AddPage.propTypes = {
  language: PropTypes.string,
  isAuthorized: PropTypes.bool,
  isAdmin: PropTypes.bool,
  added: PropTypes.bool,
  addError: PropTypes.bool,
  citiesReceived: PropTypes.bool,
  flightsReceived: PropTypes.bool,
  flights: PropTypes.any,
  cities: PropTypes.any,
  companiesReceived: PropTypes.bool,
  companies: PropTypes.any,
  langReceived: PropTypes.bool,
  languages: PropTypes.any,
  cityListReceived: PropTypes.bool,
  cityList: PropTypes.any,
  deleted: PropTypes.bool,
  langDeleted: PropTypes.bool,
  addTicketGroup: PropTypes.func,
  addNewFlight: PropTypes.func,
  getCities: PropTypes.func,
  getCompanies: PropTypes.func,
  addNewCity: PropTypes.func,
  addNewCompany: PropTypes.func,
  getFlights: PropTypes.func,
  discardAll: PropTypes.func,
  getAvailableLanguages: PropTypes.func,
  addNewLanguage: PropTypes.func,
  getCityList: PropTypes.func,
  updateCityTranslations: PropTypes.func,
  deleteCurrCity: PropTypes.func,
  updateCompanyTranslations: PropTypes.func,
  deleteCurrCompany: PropTypes.func,
  deleteCurrLang: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    addTicketGroup(ticket) {
      dispatch(addTicket(ticket));
    },

    addNewFlight(flight) {
      dispatch(addFlight(flight));
    },

    getCities(language) {
      dispatch(getAllCities(language));
    },

    discardAll() {
      dispatch(discardState());
    },

    getCompanies(language) {
      dispatch(getAllCompanies(language));
    },

    addNewCity(translations) {
      dispatch(addCity(translations));
    },

    addNewCompany(translations) {
      dispatch(addCompany(translations));
    },

    addNewLanguage(language) {
      dispatch(addLanguage(language));
    },

    getFlights(language) {
      dispatch(getAllFlights(language));
    },

    getAvailableLanguages() {
      dispatch(getLanguages());
    },

    getCityList(language) {
      dispatch(getCitiesList(language));
    },

    updateCityTranslations(id, translations) {
      dispatch(updateCity(id, translations));
    },

    updateCompanyTranslations(id, translations) {
      dispatch(updateCompany(id, translations));
    },

    deleteCurrCity(id) {
      dispatch(deleteCity(id));
    },

    deleteCurrCompany(id) {
      dispatch(deleteCompany(id));
    },

    deleteCurrLang(lang) {
      dispatch(deleteLang(lang));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  language: makeSelectLocale(),
  isAuthorized: makeSelectIsAuthorized(),
  isAdmin: makeSelectIsAdmin(),
  citiesReceived: makeSelectIsCitiesDataReceived(),
  cities: makeSelectCities(),
  companiesReceived: makeSelectIsCompaniesDataReceived(),
  companies: makeSelectCompanies(),
  added: makeSelectAdded(),
  addError: makeSelectAddError(),
  flightsReceived: makeSelectIsFlightsDataReceived(),
  flights: makeSelectFlights(),
  langReceived: makeSelectIsLanguagesDataReceived(),
  languages: makeSelectLanguages(),
  cityListReceived: makeSelectIsCityListReceived(),
  cityList: makeSelectCityList(),
  deleted: makeSelectDeleted(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddPage);
