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

            return <List schools={data.schools}/>
          }}
        </Query>      
      </div>
    );
  }
}

const List = ({ schools }) => (
  <div>
    <div className="list">
      {
        schools.map(({ uuid, name, avgGraduateSalary, jobPlacementRate, lengthInWeeks, isOnline, photoURI, basePrice, paymentType, tracks, locations }) => (
          <div className="list-row" key={uuid}>
            <p>{name}: {basePrice}</p>
          </div>
        ))
      }
    </div>
  </div>
);

export default Search;
