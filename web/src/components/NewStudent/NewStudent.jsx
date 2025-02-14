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
        <div className="pageBackground">
          <div className="studentInfoWrapper">
            <div className="columns is-centered">
              <div className="defaultContainer column is-three-fifths">
                <div className="studentInfo column is-four-fifths">
                    <div className="image">
                      <img src={linkedInPhotoURL} alt="ProfilePhoto" />
                    </div>

                    <div className="studentFields">
                      <FieldRow labelText="First Name" fieldText={firstName} inputType="text"/>
                      <FieldRow labelText="Last Name" fieldText={lastName} inputType="text" />
                      <FieldRow labelText="Email" fieldText={email} inputType="email" />
                    </div>
                    <div className="profileButtons">
                      <div className="buttons">
                        <button className="button is-primary" key="signUp" onClick={this.onSignUpClick}><strong>Sign Up</strong></button>
                      </div>
                    </div>
                </div>
          	</div>
          </div>
        </div>
      </div>
    );
  }
}

const FieldRow = ({ labelText, fieldText, inputType }) => (
  <div className="field is-horizontal">
    <div className="field-body">
      <div className="field-label is-normal">
        <label className="label">{labelText}</label>
      </div>
    </div>
    <div className="field-body">
      <div className="control">
      {
          <input className="input is-static studentEmail" type={inputType} value={fieldText} readOnly />
      }
      </div>
    </div>
  </div>
);

export default compose(withRouter, withApollo)(NewStudent);
