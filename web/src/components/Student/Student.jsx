import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { Query } from 'react-apollo';
import auth from '../../Auth/auth.jsx';
import gql from 'graphql-tag';
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
              if (error || !data.student) return <p>Error :(</p>;

              let isMe = false;
              if (data.student.uuid & data.student.uuid === auth.getProfile().studentUUID) {
                isMe = true;
              }

              const { email } = auth.getProfile();
              const { uuid, firstName, lastName, linkedInPhotoURL } = data.student;

              return (
                <div className="studentInfo">
                    <div className="image">
                      <img src={linkedInPhotoURL} alt="ProfilePhoto" />
                    </div>
                    <div className="name">
                      <div className="nameLabel">Name</div>
                      <div className="nameText">{firstName} {lastName}</div>
                    </div>
                    <div className="email">
                      <div className="emailLabel">Email</div>
                      <div className="emailText">{email}</div>
                    </div>
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
