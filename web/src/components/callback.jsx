import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { Redirect } from 'react-router';
import auth from '../Auth/auth.jsx';
import { Query } from "react-apollo";
import gql from "graphql-tag";

class Callback extends Component {

  state = {
    shouldReRender: false
  }

  async componentDidMount() {
    try {
      await auth.handleAuth();
    } catch (err) {
      console.log("Failed to handleAuth");
    }
    this.setState({ shouldReRender: true });
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

    if (auth.isAuthenticated() && auth.getProfile()) {
      console.log("calling for student info");
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
                console.log(data.student);
                return (<Redirect push to="/home" />);
              } else {
                console.log("new");
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
