import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Navbar from '../navbar.jsx';
import FilterBar from './filterbar.jsx';
import Pagination from './pagination.jsx';
import SchoolLogo from '../Common/SchoolLogo';
import {
  JobPlacementBar,
  PriceBar,
  SalaryBar,
  LocationBar,
  LengthBar,
} from '../Common/SchoolStats';
import './Search.css';

class Search extends Component {
  render() {
    const schoolsQuery = gql`
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

    console.log(this.props.currentSearchParams);

    return (
      <div>
        <Navbar onSearch={this.props.onSetSearchParams} login={this.props.login}/>
        <FilterBar
          onSetSearchParams={this.props.onSetSearchParams}
          currentSearchParams={this.props.currentSearchParams}
        />
        <div className="pageBackground">
          <Query
            query={schoolsQuery}
            variables={{ searchParams: this.props.currentSearchParams }}
          >
            {({ loading, error, data }) => {
              if (loading) return <p></p>;
              if (error) return <p>Error :(</p>;

              return (
                <div className="searchResults">
                  <div className="searchHeader">
                    <div className="searchTitle">
                      Software Engineering Schools
                    </div>
                  </div>
                  <List schools={data.schools.schoolResults} />
                  <Pagination
                    currentPage={this.props.currentSearchParams.pageNumber}
                    totalItems={data.schools.totalNumResults}
                    onSetSearchParams={this.props.onSetSearchParams}
                  />
                </div>
              );
            }}
          </Query>
        </div>
      </div>
    );
  }
}

const List = ({ schools }) => (
  <div>
    <div className="schoolList">
      {schools.map(
        ({
          uuid,
          name,
          lengthInWeeks,
          isOnline,
          photoURI,
          basePrice,
          paymentType,
          campusLocations,
        }) => (
          <Link to={`/schools/${uuid}`} key={uuid}>
            <div className="card">
              <SchoolLogo photoURI={photoURI} />
              <div className="schoolInfoWrapper" style={{ marginLeft: '30px' }}>
                <div className="name">{name}</div>
                <LocationBar campusLocations={campusLocations} />
                <PriceBar basePrice={basePrice} paymentType={paymentType} />
                <LengthBar length={lengthInWeeks} />
                <SalaryBar campusLocations={campusLocations} />
                <JobPlacementBar campusLocations={campusLocations} />
              </div>
            </div>
          </Link>
        ),
      )}
    </div>
  </div>
);

export default Search;
