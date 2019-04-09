import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

class NewUser extends Component {
  render() {
    const getUserQuery = gql`
      query GetSchools($searchParams: SchoolSearchParams!) {
        schools(params: $searchParams) {
          totalNumResults
          pageNumber
          schoolResults {
            uuid
            name
            lengthInWeeks
            isOnline
            photoURI
            basePrice
            paymentType
            campusLocations {
              location {
                uuid
                city
                country
              }
              medianGraduateSalary
              jobPlacementRate
            }
          }
        }
      }
    `;

    return (
      <div>
      </div>
    );
  }
}

export default NewUser;
