import React, { Component } from 'react';
import './School.css';
import { Query } from "react-apollo";
import gql from "graphql-tag";


class School extends Component {

  render() {
    console.log(this.props);
    return (
      <div>
      school
      </div>
    );
  }
}

export default School;
