import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Navbar from '../navbar';
import SchoolLogo from '../Common/SchoolLogo';
import SalaryIcon from '../../images/finances_icon.png';
import JobIcon from '../../images/job_placement_icon.png';
import {
  StudentTeacherRatioBar,
  PriceBar,
  SalaryBar,
  LocationBar,
  LengthBar,
} from '../Common/SchoolStats';
import ReviewListQuery from './ReviewListQuery.jsx';
import { numToString } from '../../helpers/helpers.js';
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
            totalNumReviews
            overallScore
            teachingScore
            courseworkScore
            atmosphereScore
            careerPreparationScore
            averageSalaryBefore
            averageSalaryAfter
            averageMonthsToAcquireJob
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
                      <StudentOutcomes schoolName={name} reviewSummary={reviewSummary} />
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
const StudentOutcomes = ({ schoolName, reviewSummary }) => {
  return (
    <div>
      <div className="studentOutcomesLabel">Student Outcomes</div>

      <div className="salaryOutcome">
        <div className="salaryOutcomeLabel">
          <img src={SalaryIcon} alt="Salary" />
          Salary
        </div>
        <div className="salaryOutcomeBefore">
          <div className="salaryOutcomeItemLabel">
            Average Salary Before {schoolName}
          </div>
          <div className="salaryOutcomeItemValue">
            {
              reviewSummary.averageSalaryBefore ? (
                "$" + numToString(reviewSummary.averageSalaryBefore)
              ) : <div/>
            }
          </div>
        </div>
        <div className="salaryOutcomeAfter">
          <div className="salaryOutcomeItemLabel">
            Average Salary After {schoolName}
          </div>
          <div className="salaryOutcomeItemValue">
            {
              reviewSummary.averageSalaryAfter ? (
                "$" + numToString(reviewSummary.averageSalaryAfter)
              ) : <div/>
            }
          </div>
        </div>
      </div>

      <div className="jobOutcome">
        <div className="jobOutcomeLabel"><img src={JobIcon} alt="Job_Icon"/>Job</div>
        <div className="monthsTillJob">
          <div className="monthsTillJobItemLabel">Average # Months (Post-Grad) To Find Job</div>
          <div className="monthsTillJobItemValue">
            {
              reviewSummary.averageMonthsToAcquireJob ? (
                reviewSummary.averageMonthsToAcquireJob
              ) : <div/>
            }
          </div>
        </div>
      </div>

    </div>
  );
};

export default School;
