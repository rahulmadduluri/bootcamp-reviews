import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { Query } from 'react-apollo';
import auth from '../../Auth/auth.jsx';
import Navbar from '../navbar.jsx';
import gql from 'graphql-tag';
import './Student.css';

class Student extends Component {

  state = {
    isUpdating: false
  };

  onUpdatingStatusLink = () => {
    const updateStatus = this.state.isUpdating;
    this.setState({ isUpdating: !updateStatus });
  };

  onUpdateProfileLink = () => {

  };

  onSignOutLink = () => {
    auth.logout();
  };

  render() {

    const studentQuery = gql`
      query GetStudent($studentUUID:ID!) {
        student(uuid: $studentUUID) {
          uuid
          firstName
          lastName
          photoURI
          linkedInPhotoURL
        }
      }
    `;

    return (
      <div>
        <Navbar />
        <div className="pageBackground">
          <div className="studentInfoWrapper">
            <div className="columns is-centered">
              <div className="defaultContainer column is-three-fifths">
                <Query
                  query={studentQuery}
                  variables={{ studentUUID: this.props.match.params.uuid }}
                >
                  {({ loading, error, data }) => {
                    if (loading) return <p></p>;
                    if (error || !data.student) return <p>Error :(</p>;


                    let isMe = false;
                    if (data.student.uuid && data.student.uuid === auth.getProfile().studentUUID) {
                      isMe = true;
                    }

                    const { email } = auth.getProfile();
                    const { uuid, firstName, lastName, linkedInPhotoURL } = data.student;

                    return (
                      <div className="studentInfo column is-four-fifths">
                        <div className="image">
                          <img src={linkedInPhotoURL} alt="ProfilePhoto" />
                        </div>
                        <div className="studentFields">
                          <FieldRow isUpdating={this.state.isUpdating} labelText="First Name" fieldText={firstName} inputType={"text"}/>
                          <FieldRow isUpdating={this.state.isUpdating} labelText="Last Name" fieldText={lastName} inputType={"text"} />
                          {
                            isMe ? <FieldRow isUpdating={this.state.isUpdating} labelText="Email" fieldText={email} inputType={"email"} /> : <div/>
                          }
                        </div>
                        {
                          isMe ? 
                            <ProfileButtons isUpdating={this.state.isUpdating} onUpdatingStatusLink={this.onUpdatingStatusLink} onUpdateProfileLink={this.onUpdateProfileLink} onSignOutLink={this.onSignOutLink} /> : <div/>
                        }
                        
                      </div>
                    );
                  }}
                </Query>
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

const ProfileButtons = ({ isUpdating, onSignOutLink, onUpdatingStatusLink, onUpdateProfileLink }) => (
  <div>
    {
      isUpdating ?
      (
        <div className="profileButtons">
          <div className="buttons">
            <a className="button is-primary" onClick={onUpdateProfileLink}><strong>Submit</strong></a>
          </div>
        </div>
      ) :
      (
        <div className="profileButtons">
          <div className="buttons">
            <a className="button is-primary" onClick={onUpdatingStatusLink}><strong>Update Profile</strong></a>
          </div>
          <div className="buttons">
            <a className="button is-secondary" onClick={onSignOutLink}><strong>Log Out</strong></a>
          </div>
        </div>
      )
    }
  </div>
);

export default withRouter(Student);
