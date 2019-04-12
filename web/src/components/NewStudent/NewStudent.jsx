import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import auth from '../../Auth/auth.jsx';

class NewStudent extends Component {


  render() {
    const newStudentMutation = gql`
		mutation CreateStudent($studentInfo:CreateStudentInput!) {
			createStudent(studentInfo: $studentInfo)
		}
    `;

    const { studentUUID, email, firstName, lastName, linkedInPhotoURL } = auth.getProfile();

    return (
      <div className="pageBackground columns is-centered">
    	<div className="schoolPage column is-three-fifths">
	        <div className="media">
	          <div className="media-content">
	              <div className="media-left image">
	                <img src={linkedInPhotoURL} alt="ProfilePhoto" />
	              </div>
	              <div className="name">{firstName} {lastName}</div>
	          </div>
	        </div>
    	</div>
      </div>
    );
  }
}

export default withRouter(NewStudent);
