import React, { Component } from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';
import GoButton from "./go_button.jsx";
import LandingLocationButton from "./landing_location_button.jsx";
import { Query } from "react-apollo";
import gql from "graphql-tag";


class Landing extends Component {

  render() {
    const filtersQuery = gql`
      query GetFilters {
        filters {
          locations {
            uuid
            city
            country
          }
          paymentTypes
        }
      }
    `;

    return (
      <div>
        <div className="Search-Area">
          <div className="Title">
                <h4>Raft</h4>
          </div>
          <div className="Subtitle">
            <p>trustworthy statistics and reviews for software engineering schools</p>
          </div>
          <div className="Landing-Filter">

            <Query
              query={filtersQuery}
            >
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;

                return <LandingLocationButton searchOptions={ data.filters } onSelect={this.props.onSetSearchParams}/>
              }}
            </Query>      
          </div>
          <div className="Button-Wrapper">
            <GoButton to="/home" />
          </div>
        </div>
        <div className="Landing-Background">
        </div>
      </div>
    );
  }
}

export default Landing;
