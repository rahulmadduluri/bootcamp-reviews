import React from 'react';
import './filterbar.css';
import { Query } from "react-apollo";
import gql from "graphql-tag";

class FilterBar extends React.Component {

  state = {
    trackFilter: null,
    priceFilter: null,
    campusLocationFilter: null,
    paymentTypeFilter: null
  };

  onSelectFilter = (filter) => {
  };

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
        <TracksFilter currentTrack={currentSearchParams.trackUUID} allTracks={searchOptions.tracks} />
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

function TracksFilter(tracksWrapper) {
  if (tracksWrapper.currentTrack == null) {
    return <div>a</div>;
  } else {
    return <div>b</div>;
  }
};

export default FilterBar;
