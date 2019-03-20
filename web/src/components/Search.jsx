import React, { Component } from 'react';
import './Search.css';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Navbar from './navbar.jsx';

class Search extends Component {

  render() {

    const schoolsQuery = gql`
      query GetSchools($searchParams: SchoolSearchParams!) {
        schools(params: $searchParams) {
          uuid
          name
          avgGraduateSalary
          acceptanceRate
          jobPlacementRate
          lengthInWeeks
          isOnline
          photoURI
            basePrice
            paymentType
          tracks {
            uuid
            name
          }
          locations {
            uuid
            city
            country
          }
        }
      }
    `;

    return (
      <div>
        <Navbar />
        <Query
          query={schoolsQuery}
          variables={ { searchParams:this.props.currentSearchParams } }
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return data.schools.map(({ uuid, name, basePrice }) => (
              <div key={uuid}>
                <p>{name}: {basePrice}</p>
              </div>
            ));
          }}
        </Query>      
      </div>
    );
  }
}

export default Search;
