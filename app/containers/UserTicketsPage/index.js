import React from 'react';
import EmptyResult from '../../components/EmptyResult';

export default class UserTicketsPage extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <section className="container-flex">
        <EmptyResult />
      </section>
    );
  }
}
