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

  const GET_SCHOOL_PARAMS = gql`
              query GetSchoolSearchParams {
                schoolSearchParams @client {
                  pageNumber
                  searchText
                  locationUUID
                  paymentType
                  maxPrice
                  minGraduateSalary
                  minJobPlacementRate
                  minLength
                }
              }
            `;

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

    return (
      <div>
        <Navbar />

        <Query query={GET_SCHOOL_PARAMS}>
          {({ data: { schoolSearchParams } }) => {

            // need to remove type for remote calls because "Input" object doesn't have type
            let schoolSearchParamsNoTypeName = JSON.parse(JSON.stringify(schoolSearchParams));
            delete schoolSearchParamsNoTypeName.__typename;

            return (
              <div>
                <FilterBar
                  currentSearchParams={schoolSearchParamsNoTypeName}
                />
                <div className="pageBackground">
                  <Query
                    query={schoolsQuery}
                    variables={{ searchParams: schoolSearchParamsNoTypeName }}
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
                            currentPage={schoolSearchParamsNoTypeName.pageNumber}
                            totalItems={data.schools.totalNumResults}
                          />
                        </div>
                      );
                    }}
                  </Query>
                </div>
              </div>
            );
          }}
        </Query>

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
