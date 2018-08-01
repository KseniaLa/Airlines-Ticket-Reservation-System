import React from 'react';
import EmptyResult from '../../components/EmptyResult/index';

export default class UserTicketsPage extends React.Component {
  render() {
    return (
      <section className="container-flex">
        <EmptyResult />
      </section>
    );
  }
}
