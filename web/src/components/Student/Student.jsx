import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import auth from '../../Auth/auth.jsx';
import './Student.css';

class Student extends Component {


  render() {

    const { studentUUID, email, firstName, lastName, linkedInPhotoURL } = auth.getProfile();

    return (
      <div className="pageBackground columns is-centered">
    	<div className="defaultContainer column is-three-fifths">
	          <div className="newStudentInfo">
	              <div className="image">
	                <img src={linkedInPhotoURL} alt="ProfilePhoto" />
	              </div>
	              <div className="name">{firstName} {lastName}</div>
	              <div className="email">{email}</div>
	          </div>
    	</div>
      </div>
    );
  }
}

export default withRouter(Student);
