import React, { Component } from 'react';
import './Landing.css';
import ContainedButton from "./contained_button.jsx";
import DropdownSearch from "./dropdown_search.jsx";
import { Query } from "react-apollo";
import gql from "graphql-tag";


class Landing extends Component {

  render() {

    const filtersQuery = gql`
      query GetFilters {
        filters {
          tracks {
            uuid
            name
          }
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

                return <DropdownSearch searchOptions={ data.filters } onSelect={this.props.onSetSearchParams}/>
              }}
            </Query>      
          </div>
          <div className="Button-Wrapper">
            <ContainedButton onClick={this.props.onGo}/>
          </div>
        </div>
        <div className="Landing-Background">
        </div>
      </div>
    );
  }
}

export default Landing;
