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
          locations {
            uuid
            city
            country
          }
          paymentTypes
          minLengths
          maxPrices
        }
      }
    `;

    return (
      <Query
        query={filtersQuery}
      >
        {({ loading, error, data }) => {
          if (loading) return <p></p>;
          if (error) return <p>Error :(</p>;
          return <FilterList searchOptions={ data.filters } currentSearchParams={this.props.currentSearchParams} onSelect={this.props.onSetSearchParams}/>
        }}
      </Query>
    );
  }
}

const FilterList = ({ searchOptions, currentSearchParams, onSelect }) => (
  <div className="FilterWrapper">
    <div className="FilterBar">
      <div className="CampusLocation">
        <FilterButton currentOption={currentSearchParams.locationUUID} filterType="Location" allOptions={searchOptions.locations} onSelect={onSelect}/>
      </div>
      <div className="PaymentType">
        <FilterButton filterType="Payment Type" allOptions={searchOptions.paymentTypes} onSelect={onSelect}/>
      </div>
      <div className="MinLength">
        <FilterButton filterType="Minimum Length" allOptions={searchOptions.minLengths} onSelect={onSelect}/>
      </div>
      <div className="MaxPrice">
        <FilterButton filterType="Max Price" allOptions={searchOptions.maxPrices} onSelect={onSelect}/>
      </div>
    </div>
  </div>
);

export default FilterBar;
