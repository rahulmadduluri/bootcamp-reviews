import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import auth from '../../Auth/auth.jsx';
import './Student.css';

class Student extends Component {


  render() {

    const studentQuery = gql`
      query GetStudent($uuid: ID!) {
        student(uuid: $uuid) {
          uuid
          firstName
          lastName
          linkedInPhotoURL
        }
      }
    `;

    return (
      <div className="pageBackground columns is-centered">
      	<div className="defaultContainer column is-three-fifths">
          <Query
            query={studentQuery}
            variables={{ uuid: this.props.match.params.uuid }}
          >
            {({ loading, error, data }) => {
              if (loading) return <p></p>;
              if (error || !this.data.student) return <p>Error :(</p>;

              const { uuid, email, firstName, lastName, linkedInPhotoURL } = this.data.student;

              return (
                <div className="studentInfo">
                  <div className="image">
                    <img src={linkedInPhotoURL} alt="ProfilePhoto" />
                  </div>
                  <div className="name">{firstName} {lastName}</div>
                  <div className="email">{email}</div>
                </div>              
              );
            }}
          </Query>
      	</div>
      </div>
    );
  }
}

export default withRouter(Student);
