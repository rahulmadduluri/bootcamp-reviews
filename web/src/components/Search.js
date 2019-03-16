import React, { Component } from 'react';
import './Search.css';
import ContainedButton from "./contained_button";
import { Query } from "react-apollo";
import gql from "graphql-tag";

class Search extends Component {

  render() {
    return (
      <Query
        query={gql`
          {
            schools(params: {}) {
              uuid
              name
              basePrice
            }
          }
        `}
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
    );
  }
}

export default Search;
