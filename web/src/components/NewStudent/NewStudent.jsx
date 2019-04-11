import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

class NewStudent extends Component {
	
  render() {

    const newStudentMutation = gql`
		mutation CreateStudent($studentInfo:CreateStudentInput!) {
			createStudent(studentInfo: $studentInfo)
		}
    `;

    return (
      <div>
        lol
      </div>
    );
  }
}

export default NewStudent;
