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
                      <FieldRow isUpdating={true} labelText="First Name" fieldText={firstName} inputType={"text"}/>
                      <FieldRow isUpdating={true} labelText="Last Name" fieldText={lastName} inputType={"text"} />
                      <FieldRow isUpdating={false} labelText="Email" fieldText={email} inputType={"email"} />
                    </div>
                    <div className="profileButtons">
                      <div className="buttons">
                        <a className="button is-primary" onClick={this.onSignUpClick}><strong>Sign Up</strong></a>
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

const FieldRow = ({ isUpdating, labelText, fieldText, inputType }) => (
  <div className="field is-horizontal">
    <div className="field-body">
      <div className="field-label is-normal">
        <label className="label">{labelText}</label>
      </div>
    </div>
    <div className="field-body">
      <div className="field">
        <p className="control">
        {
          isUpdating ?
          (
            <input className="input" type={inputType} value={fieldText} />
          ) :
          (
            <input className="input is-static" type={inputType} value={fieldText} readOnly />
          )
        }
        </p>
      </div>
    </div>
  </div>
);

export default compose(withRouter, withApollo)(NewStudent);
