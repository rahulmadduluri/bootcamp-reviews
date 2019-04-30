import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Navbar from '../navbar';
import SchoolLogo from '../Common/SchoolLogo';
import {
  JobPlacementBar,
  PriceBar,
  SalaryBar,
  LocationBar,
  LengthBar,
} from '../Common/SchoolStats';
import ReviewListQuery from './ReviewListQuery.jsx';
import './School.css';

class School extends Component {
  render() {
    const getQuery = gql`
      query GetSchool($schoolUUID: ID!) {
        school(uuid: $schoolUUID) {
          uuid
          name
          lengthInWeeks
          isOnline
          photoURI
          basePrice
          paymentType
          campusLocations {
            medianGraduateSalary
            jobPlacementRate
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
        }
      }
    `;

    return (
      <div>
        <Navbar />
        <div className="pageBackground">
          <Query query={getQuery} variables={{ schoolUUID: this.props.uuid }}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;
              const { name, campusLocations, lengthInWeeks, paymentType, basePrice, photoURI } = data.school;
              return (
                <div>
                  <div className="schoolInfoWrapper">
                    <div className="defaultContainer column is-three-fifths">
                      <div className="media">
                        <div className="media-left image is-128x128">
                          <SchoolLogo photoURI={photoURI} />
                        </div>
                        <div className="media-content">
                          <div className="schoolName">{name}</div>
                          <PriceBar basePrice={basePrice} paymentType={paymentType} />
                          <LocationBar showAllLocationsLabel={true} campusLocations={campusLocations} />
                          <LengthBar length={lengthInWeeks} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="schoolStatsWrapper">
                    <div className="defaultContainer column is-three-fifths">
                      <Stats school={data.school} />
                    </div>
                  </div>
                </div>
              );
            }}
          </Query>

          <div className="schoolReviewsWrapper">
            <div className="defaultContainer column is-three-fifths">
              <ReviewListQuery schoolUUID={this.props.uuid}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const Stats = ({ school }) => {
  const { campusLocations } = school;
  return (
    <div>
      <div className="statsLabel">Stats</div>
      <SalaryBar campusLocations={campusLocations} />
      <JobPlacementBar campusLocations={campusLocations} />
    </div>
  );
};

export default School;
