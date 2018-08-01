import React from 'react';
import EmptyResult from '../../components/EmptyResult/index';

/* eslint-disable react/prefer-stateless-function */
export default class UserTicketsPage extends React.Component {
  render() {
    return (
      <section className="container-flex">
        <EmptyResult />
      </section>
    );
  }
}
