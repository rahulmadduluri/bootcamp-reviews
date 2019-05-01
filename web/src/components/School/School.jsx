import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Navbar from '../navbar';
import SchoolLogo from '../Common/SchoolLogo';
import {
  StudentTeacherRatioBar,
  PriceBar,
  SalaryBar,
  LocationBar,
  LengthBar,
} from '../Common/SchoolStats';
import ReviewListQuery from './ReviewListQuery.jsx';
import './School.css';

class School extends Component {

  state = {
    overallScore: null,
    teachingScore: null,
    courseworkScore: null,
    atmosphereScore: null,
    careerPreparationScore: null
  }

  render() {
    const getQuery = gql`
      query GetSchool($schoolUUID: ID!) {
        school(uuid: $schoolUUID) {
          uuid
          name
          lengthInWeeks
          studentTeacherRatio
          isOnline
          photoURI
          basePrice
          paymentType
          campusLocations {
            location {
              uuid
              city {
                name
              }
              country {
                name
              }
            }
          }
          reviewSummary {
            overallScore
            teachingScore
            courseworkScore
            atmosphereScore
            careerPreparationScore
            averageSalaryBefore
            averageSalaryAfter
          }
        }
      }
    `;

    return (
      <div>
        <Navbar />
        <div className="pageBackground">
          <Query 
            query={getQuery}
            variables={{ schoolUUID: this.props.uuid }}
            fetchPolicy="cache-and-network"
          >
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;

              const { name, campusLocations, lengthInWeeks, studentTeacherRatio, paymentType, basePrice, photoURI, reviewSummary } = data.school;

              return (
                <div>
                  <div className="schoolInfoWrapper">
                    <div className="defaultContainer column is-three-fifths">
                      <div className="media">
                        <div className="media-left image is-96x96">
                          <SchoolLogo photoURI={photoURI} />
                        </div>
                        <div className="media-content">
                          <div className="schoolName">{name}</div>
                          <PriceBar basePrice={basePrice} paymentType={paymentType} />
                          <LocationBar showAllLocationsLabel={true} campusLocations={campusLocations} />
                          <LengthBar length={lengthInWeeks} />
                          <StudentTeacherRatioBar studentTeacherRatio={studentTeacherRatio} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="studentOutcomesWrapper">
                    <div className="defaultContainer column is-three-fifths">
                      <StudentOutcomes reviewSummary={reviewSummary} />
                    </div>
                  </div>
                  <div className="schoolReviewsWrapper">
                    <div className="defaultContainer column is-three-fifths">
                      <ReviewListQuery schoolUUID={this.props.uuid} reviewSummary={reviewSummary} />
                    </div>
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

// allow user to filter outcomes by school location AND/OR job location
// median salary before, median salary after, median took X months to get a job after graduating
const StudentOutcomes = ({ reviewSummary }) => {
  return (
    <div>
      <div className="studentOutcomesLabel">Student Outcomes</div>
      <SalaryBar after={true} salaryAfter={reviewSummary.averageSalaryAfter} />
      <SalaryBar after={false} salaryBefore={reviewSummary.averageSalaryBefore} />
    </div>
  );
};

export default School;
