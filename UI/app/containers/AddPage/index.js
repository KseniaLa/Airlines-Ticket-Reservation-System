import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Popup from 'react-popup';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import Spinner from '../../components/basic/Spinner';
import AddTicketForm from '../../components/AddTicketForm';
import AddLocationForm from '../../components/AddLocationForm';
import AddFlightForm from '../../components/AddFlightForm';
import { makeSelectLocale } from '../LanguageProvider/selectors';
import { makeSelectIsAuthorized, makeSelectIsAdmin } from '../App/selectors';
import './style.scss';
import {
  addTicket,
  getAllCities,
  discardState,
  getAllCompanies,
  addCity,
  addCompany,
  getAllFlights,
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
} from './selectors';

import messages from './messages';

class AddPage extends React.Component {
  constructor(props) {
    super(props);
    this.addTicket = this.addTicket.bind(this);
    this.getCitiesList = this.getCitiesList.bind(this);
    this.getFlightsList = this.getFlightsList.bind(this);
    this.addCity = this.addCity.bind(this);
    this.addCompany = this.addCompany.bind(this);
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

  componentDidUpdate() {
    if (this.props.locationAdded) {
      Popup.plugins().successPopup('location added');
      this.props.discardAll();
      this.getData();
    } else if (this.props.locationAddError) {
      Popup.plugins().errorPopup('location error');
      this.props.discardAll();
      this.getData();
    }

    if (this.props.ticketAdded) {
      Popup.plugins().successPopup('ticket added');
      this.props.discardAll();
      this.getData();
    } else if (this.props.ticketAddError) {
      Popup.plugins().errorPopup('ticket error');
      this.props.discardAll();
      this.getData();
    }
  }

  getData() {
    this.props.getCities(this.props.language);
    this.props.getCompanies(this.props.language);
    this.props.getFlights(this.props.language);
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

  addCity(translations) {
    this.props.addNewCity(translations);
  }

  addCompany(translations) {
    this.props.addNewCompany(translations);
  }

  getCitiesList() {
    const list = [];
    const { cities } = this.props;
    cities.forEach((element, index) => {
      list.push(<p key={index}>{element}</p>);
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

  render() {
    if (!this.props.isAuthorized || !this.props.isAdmin) {
      return (
        <div className="container-flex">
          <h1>forbidden</h1>
        </div>
      );
    }
    const flights = this.props.flightsReceived
      ? this.getFlightsList()
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
          <div className="list-container">
            <div className="list-container__list">{cities}</div>
            <div className="list-container__list">{companies}</div>
          </div>
          <div className="form-container">
            <AddLocationForm onSubmit={this.addCity} />
            <AddLocationForm onSubmit={this.addCompany} />
          </div>
          <AddFlightForm onFlightSubmit={this.addTicket} />
          <AddTicketForm
            onTicketSubmit={this.addTicket}
            flights={flights.names}
            values={flights.values}
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
  locationAdded: PropTypes.bool,
  locationAddError: PropTypes.bool,
  citiesReceived: PropTypes.bool,
  flightsReceived: PropTypes.bool,
  flights: PropTypes.array,
  cities: PropTypes.array,
  companiesReceived: PropTypes.bool,
  companies: PropTypes.array,
  addTicketGroup: PropTypes.func,
  getCities: PropTypes.func,
  getCompanies: PropTypes.func,
  addNewCity: PropTypes.func,
  addNewCompany: PropTypes.func,
  getFlights: PropTypes.func,
  discardAll: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    addTicketGroup(ticket) {
      dispatch(addTicket(ticket));
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

    getFlights(language) {
      dispatch(getAllFlights(language));
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
  locationAdded: makeSelectLocationAdded(),
  locationAddError: makeSelectLocationAddError(),
  flightsReceived: makeSelectIsFlightsDataReceived(),
  flights: makeSelectFlights(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddPage);
