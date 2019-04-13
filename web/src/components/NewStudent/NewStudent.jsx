import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import auth from '../../Auth/auth.jsx';
import { compose } from 'recompose';
import '../Student/Student.css';

class NewStudent extends Component {

  onSignUpClick = async () => {

    const newStudentMutation = gql`
		mutation CreateStudent($studentInfo:CreateStudentInput!) {
			createStudent(studentInfo: $studentInfo)
		}
    `;
    const { studentUUID, email, firstName, lastName, linkedInPhotoURL } = auth.getProfile();
    const studentInfo = {
    	uuid: studentUUID,
    	firstName: firstName,
    	lastName: lastName,
    	email: email,
    	linkedInPhotoURL: linkedInPhotoURL
    };

    const { data } = await this.props.client.mutate({
    	mutation: newStudentMutation,
        variables: { studentInfo: studentInfo }
    });

    if (data.createStudent === true) {
    	this.props.history.push('/home');
    }
  };

  render() {

    const { email, firstName, lastName, linkedInPhotoURL } = auth.getProfile();

    return (
      <div className="pageBackground columns is-centered">
    	<div className="defaultContainer column is-three-fifths">
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
              <div className="buttons">
                  <button className="button is-primary" onClick={this.onSignUpClick}><strong>Sign Up</strong></button>
              </div>
          </div>
    	</div>
      </div>
    );
  }
}

export default compose(withRouter, withApollo)(NewStudent);
