import React, { Component } from 'react';
import './School.css';
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
              city
              country
            }
          }
        }
      }
    `;

    return (
      <div>
        <Navbar />
        <div className="pageBackground columns is-centered">
          <div className="schoolPage column is-three-fifths">
            <Query query={getQuery} variables={{ schoolUUID: this.props.uuid }}>
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;
                const { name, photoURI, uuid } = data.school;
                return (
                  <div className="">
                    <div className="media">
                      <div className="media-left image">
                        <SchoolLogo photoURI={photoURI} />
                      </div>
                      <div className="media-content">
                        <div className="name">{name}</div>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </p>
                      </div>
                    </div>
                    <Stats school={data.school} />
                  </div>
                );
              }}
            </Query>
          </div>
        </div>
      </div>
    );
  }
}

const Stats = ({ school }) => {
  const { campusLocations, paymentType, basePrice, lengthInWeeks } = school;
  console.log(school);
  return (
    <div className="schoolInfoWrapper">
      <div className="stats">Stats</div>
      <LocationBar campusLocations={campusLocations} />
      <PriceBar basePrice={basePrice} paymentType={paymentType} />
      <LengthBar length={lengthInWeeks} />
      <SalaryBar campusLocations={campusLocations} />
      <JobPlacementBar campusLocations={campusLocations} />
    </div>
  );
};

export default School;
