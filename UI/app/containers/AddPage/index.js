import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../../components/basic/Button';
import Spinner from '../../components/basic/Spinner';
import AddTicketForm from '../../components/AddTicketForm';
import { makeSelectLocale } from '../LanguageProvider/selectors';
import { makeSelectIsAuthorized, makeSelectIsAdmin } from '../App/selectors';
import './style.scss';
import {
  addTicket,
  getAllCities,
  discardState,
  getAllCompanies,
} from './actions';
import {
  makeSelectIsCitiesDataReceived,
  makeSelectCities,
  makeSelectIsCompaniesDataReceived,
  makeSelectCompanies,
} from './selectors';

import messages from './messages';

class AddPage extends React.Component {
  constructor(props) {
    super(props);
    this.addTicket = this.addTicket.bind(this);
    this.getCitiesList = this.getCitiesList.bind(this);
  }

  componentDidMount() {
    if (this.props.isAuthorized && this.props.isAdmin) {
      this.props.getCities(this.props.language);
      this.props.getCompanies(this.props.language);
    }
  }

  componentWillUnmount() {
    this.props.discardAll();
  }

  addTicket(from, to, date, company, flightClass, price, count) {
    this.props.addTicketGroup({
      id: 0,
      from,
      to,
      date,
      company,
      category: flightClass,
      price,
      totalCount: count,
      bookedCount: 0,
    });
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

  render() {
    if (!this.props.isAuthorized || !this.props.isAdmin) {
      return <div>forbidden</div>;
    }
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
          <Button text={<FormattedMessage {...messages.addgroup} />} />
          <AddTicketForm onTicketSubmit={this.addTicket} />
          <AddTicketForm />
        </div>
      </div>
    );
  }
}

AddPage.propTypes = {
  language: PropTypes.string,
  isAuthorized: PropTypes.bool,
  isAdmin: PropTypes.bool,
  citiesReceived: PropTypes.bool,
  cities: PropTypes.array,
  companiesReceived: PropTypes.bool,
  companies: PropTypes.array,
  addTicketGroup: PropTypes.func,
  getCities: PropTypes.func,
  getCompanies: PropTypes.func,
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddPage);
