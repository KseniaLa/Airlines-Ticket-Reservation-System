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
} from './actions';
import {
  makeSelectIsCitiesDataReceived,
  makeSelectCities,
  makeSelectIsCompaniesDataReceived,
  makeSelectCompanies,
  makeSelectTicketAdded,
  makeSelectTicketAddError,
  makeSelectLocationAdded,
  makeSelectLocationAddError,
  makeSelectIsFlightsDataReceived,
  makeSelectFlights,
  makeSelectFlightAdded,
  makeSelectFlightAddError,
  makeSelectIsLanguagesDataReceived,
  makeSelectLanguages,
  makeSelectLanguageAdded,
  makeSelectLanguageAddError,
  makeSelectIsCityListReceived,
  makeSelectCityList,
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
    if (this.props.locationAdded) {
      this.getSuccessMsg();
      this.props.discardAll();
      this.getData();
    } else if (this.props.locationAddError) {
      this.getErrorMsg();
      this.props.discardAll();
      this.getData();
    }

    if (this.props.ticketAdded) {
      this.getSuccessMsg();
      this.props.discardAll();
      this.getData();
    } else if (this.props.ticketAddError) {
      this.getErrorMsg();
      this.props.discardAll();
      this.getData();
    }

    if (this.props.flightAdded) {
      this.getSuccessMsg();
      this.props.discardAll();
      this.getData();
    } else if (this.props.flightAddError) {
      this.getErrorMsg();
      this.props.discardAll();
      this.getData();
    }

    if (this.props.languageAdded) {
      this.getSuccessMsg();
      this.props.discardAll();
      this.getData();
    } else if (this.props.languageAddError) {
      this.getErrorMsg();
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

  addTicket(flightId, company, flightClass, price, count) {
    this.props.addTicketGroup({
      flightId,
      company,
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

  getCitiesList() {
    const languages = this.props.langReceived
      ? this.getLangList()
      : { names: [], values: [] };
    const list = [];
    const { cities } = this.props;
    cities.forEach((element, index) => {
      list.push(
        <div className="list-item" key={index}>
          {element.name}
          <LocationPopup>
            <AddLocation
              translations={element.translations}
              lang={languages.names}
              values={languages.values}
              langTitle="lang"
            />
          </LocationPopup>
          <Button text="delete" />
        </div>,
      );
    });
    return list;
  }

  getCompaniesList() {
    const list = [];
    const { companies } = this.props;
    companies.forEach((element, index) => {
      list.push(<p key={index}>{element}</p>);
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

  getCityList() {
    const nameList = [];
    const valueList = [];
    const { cityList } = this.props;
    cityList.forEach(element => {
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
    const cityList = this.props.cityListReceived
      ? this.getCityList()
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
          <AddLanguageForm onSubmit={this.addLanguage} />
          <div className="list-container">
            <div className="list-container__list">{cities}</div>
            <div className="list-container__list">{companies}</div>
          </div>
          <div className="form-container">
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
          <h4>
            <FormattedMessage {...messages.addflight} />
          </h4>
          <AddFlightForm
            onFlightSubmit={this.addFlight}
            language={this.props.language}
            cities={cityList.names}
            values={cityList.values}
          />
          <h4>
            <FormattedMessage {...messages.addticket} />
          </h4>
          <AddTicketForm
            onTicketSubmit={this.addTicket}
            flights={flights.names}
            values={flights.values}
            flightTitle={
              <FormattedMessage id="app.components.AddPage.chooseflight">
                {placeholder => placeholder}
              </FormattedMessage>
            }
          />

          <AddTicketForm
            onTicketSubmit={this.addTicket}
            flights={flights.names}
            values={flights.values}
            flightTitle={
              <FormattedMessage id="app.components.AddPage.chooseflight">
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
  ticketAdded: PropTypes.bool,
  ticketAddError: PropTypes.bool,
  languageAdded: PropTypes.bool,
  languageAddError: PropTypes.bool,
  flightAdded: PropTypes.bool,
  flightAddError: PropTypes.bool,
  locationAdded: PropTypes.bool,
  locationAddError: PropTypes.bool,
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
  ticketAdded: makeSelectTicketAdded(),
  ticketAddError: makeSelectTicketAddError(),
  flightAdded: makeSelectFlightAdded(),
  flightAddError: makeSelectFlightAddError(),
  locationAdded: makeSelectLocationAdded(),
  locationAddError: makeSelectLocationAddError(),
  flightsReceived: makeSelectIsFlightsDataReceived(),
  flights: makeSelectFlights(),
  langReceived: makeSelectIsLanguagesDataReceived(),
  languages: makeSelectLanguages(),
  languageAdded: makeSelectLanguageAdded(),
  languageAddError: makeSelectLanguageAddError(),
  cityListReceived: makeSelectIsCityListReceived(),
  cityList: makeSelectCityList(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddPage);
