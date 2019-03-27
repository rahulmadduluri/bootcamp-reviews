import React from 'react';
import './filterbar.css';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import FilterButton from './filter_button.jsx';

class FilterBar extends React.Component {

  render() {
    const filtersQuery = gql`
      query GetFilters {
        filters {
          tracks {
            uuid
            name
          }
          campusLocations {
            uuid
            city
            country
          }
          paymentTypes
        }
      }
    `;

    return (
      <Query
        query={filtersQuery}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          return <FilterList searchOptions={ data.filters } currentSearchParams={this.props.currentSearchParams} onSelect={this.props.onSetSearchParams}/>
        }}
      </Query>
    );
  }
}

const FilterList = ({ searchOptions, currentSearchParams, onSelect }) => (
  <div>
    <div className="FilterBar">
      <div className="Track">
        <FilterButton currentOption={currentSearchParams.trackUUID} filterType="Track" allOptions={searchOptions.tracks} onSelect={onSelect}/>
      </div>
      <div className="OnlineStatus">
      </div>
      <div className="Price">
      </div>
      <div className="PaymentType">
      </div>
    </div>
  </div>
);

export default FilterBar;
