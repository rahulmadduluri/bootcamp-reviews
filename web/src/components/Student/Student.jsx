import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { Redirect } from 'react-router';
import { Query, withApollo } from 'react-apollo';
import auth from '../../Auth/auth.jsx';
import Navbar from '../navbar.jsx';
import gql from 'graphql-tag';
import {DefaultSchoolSearchParams} from '../../helpers/helpers.js';
import { compose } from 'recompose';
import './Student.css';

class Student extends Component {

  onSignOutLink = () => {
    // NOTE: It is important to reset cache before logging out
    this.props.client.cache.writeData({ data: { 
      schoolSearchParams: DefaultSchoolSearchParams
    }});
    
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
                  fetchPolicy="cache-and-network"
                >
                  {({ loading, error, data }) => {
                    if (loading) return <p></p>;
                    if (error || !data.student) {
                      return <Redirect push to="/students/new" />;
                    }


                    let isMe = false;
                    if (data.student.uuid && data.student.uuid === auth.getProfile().studentUUID) {
                      isMe = true;
                    }

                    const { email } = auth.getProfile();
                    const { firstName, lastName, linkedInPhotoURL } = data.student;

                    return (
                      <div className="studentInfo column is-four-fifths">
                        <div className="image">
                          <img src={linkedInPhotoURL} alt="ProfilePhoto" />
                        </div>
                        <div className="studentFields">
                          <FieldRow labelText="First Name" fieldText={firstName} inputType="text"/>
                          <FieldRow labelText="Last Name" fieldText={lastName} inputType="text" />
                          {
                            isMe ? <FieldRow labelText="Email" fieldText={email} inputType="email" /> : <div/>
                          }
                        </div>
                        {
                          isMe ? 
                            <ProfileButtons onSignOutLink={this.onSignOutLink} /> : <div/>
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

const ProfileButtons = ({ onSignOutLink, onUpdatingStatusLink, onUpdateProfileLink, onCancelUpdateProfileLink }) => (
  <div className="profileButtons">
    <div className="buttons">
      <button className="button is-secondary" key="logOut" onClick={onSignOutLink}><strong>Log Out</strong></button>
    </div>
  </div>
);

export default compose(withApollo, withRouter)(Student);
