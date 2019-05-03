import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Navbar from '../navbar.jsx';
import FilterBar from './filterbar.jsx';
import Pagination from './pagination.jsx';
import SchoolLogo from '../Common/SchoolLogo';
import { formatFloat, numToString } from '../../helpers/helpers.js';
import {
  StudentTeacherRatioBar,
  PriceBar,
  SalaryBar,
  LocationBar,
  LengthBar,
} from '../Common/SchoolStats';
import './Search.css';

const GET_SCHOOL_PARAMS = gql`
            query GetSchoolSearchParams {
              schoolSearchParams @client {
                pageNumber
                searchText
                locationUUID
                paymentType
                maxPrice
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
        studentTeacherRatio
        isOnline
        photoURI
        basePrice
        paymentType
        campusLocations {
          location {
            uuid
            city {
              name
            }
            country {
              name
            }
          }
        }
        reviewSummary {
          totalNumReviews
          overallScore
          averageSalaryAfter
        }
      }
    }
  }
`;


class Search extends Component {
  render() {
    return (
      <Query query={GET_SCHOOL_PARAMS}>
        {({ data: { schoolSearchParams } }) => {

          // need to remove type for remote calls because "Input" object doesn't have type
          let schoolSearchParamsNoTypeName = JSON.parse(JSON.stringify(schoolSearchParams));
          delete schoolSearchParamsNoTypeName.__typename;

          return (
            <div>
              <Navbar searchText={schoolSearchParamsNoTypeName.searchText}/>
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
                          pageNumber={schoolSearchParamsNoTypeName.pageNumber}
                          totalItems={data.schools.totalNumResults}
                          pageLimit={10}
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
          studentTeacherRatio,
          isOnline,
          photoURI,
          basePrice,
          paymentType,
          campusLocations,
          reviewSummary
        }) => (
          <Link to={`/schools/${uuid}`} key={uuid}>
            <div className="card schoolListing">
              <div className="reviewOverallScore ">
                <div className="scoreText">{formatFloat(reviewSummary.overallScore, 1)}</div>
              </div>
              <div className="reviewTotalNumText">
                { numToString(reviewSummary.totalNumReviews) } reviews
              </div>
              <SchoolLogo photoURI={photoURI} />
              <div className="schoolStatsWrapper" style={{ marginTop: 0, marginLeft: '30px' }}>
                <div className="name">{name}</div>
                <LocationBar campusLocations={campusLocations} />
                <PriceBar basePrice={basePrice} paymentType={paymentType} />
                <LengthBar length={lengthInWeeks} />
                <StudentTeacherRatioBar studentTeacherRatio={studentTeacherRatio}/>
                <SalaryBar after={true} salaryAfter={reviewSummary.averageSalaryAfter} />
              </div>
            </div>
          </Link>
        ),
      )}
    </div>
  </div>
);

export default Search;
