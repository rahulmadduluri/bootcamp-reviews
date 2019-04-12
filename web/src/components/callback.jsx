import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { Redirect } from 'react-router';
import auth from '../Auth/auth.jsx';
import { Query } from "react-apollo";
import gql from "graphql-tag";

class Callback extends Component {

  async componentDidMount() {
    try {
      await auth.handleAuth();
      this.forceUpdate();
    } catch (err) {
      console.log("Failed to handleAuth");
    }
  }

  render() {
    const getStudentQuery = gql`
      query GetStudent($studentUUID: ID!) {
        student(uuid: $studentUUID) {
          uuid
          firstName
          lastName
          photoURI
        }
      }
    `;

    if (auth.isAuthenticated()) {
      const { studentUUID, email, firstName, lastName, linkedInPhotoURL } = auth.getProfile();
      return (
        <Query
          query={getStudentQuery}
          variables={{ studentUUID: studentUUID }}
        >
          {({ loading, error, data }) => {
            if (loading) return <p></p>;
            if (error) return <p>Error :(</p>;

              if (data.student) {
                return (<Redirect push to="/home" />);
              } else {
                return (<Redirect push to="/students/new" />);
              }
          }}
        </Query>      
      );
    } else {
      return (<div></div>);
    }
  }
}

export default withRouter(Callback);
