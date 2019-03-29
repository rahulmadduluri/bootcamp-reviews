import React, { Component } from 'react';
import './Search.css';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Navbar from './navbar.jsx';
import FilterBar from './filterbar.jsx';
import Pagination from './pagination.jsx';
import LocationIcon from '../location_icon.png';
import ISAPayment from '../isa_payment.png';
import UpfrontPayment from '../upfront_payment.png';
import LengthIcon from '../length_icon.png';
import SalaryIcon from '../salary_icon.png';
import JobPlacementIcon from '../job_placement_icon.png';

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
            campusLocations {
              uuid
              city
              country
            }
          }
        }
      }
    `;

    console.log(this.props.currentSearchParams);

    return (
      <div>
        <Navbar onSearch={this.props.onSetSearchParams}/>
        <FilterBar onSetSearchParams={this.props.onSetSearchParams} currentSearchParams={this.props.currentSearchParams}/>
        <div className="searchBackground">
          <Query
            query={schoolsQuery}
            variables={ { searchParams:this.props.currentSearchParams } }
          >
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;

              return (
                <div className="searchResults">
                  <div className="searchHeader">
                    <div className="searchTitle">Software Engineering Schools</div>
                  </div>
                  <List schools={data.schools.schoolResults}/>
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
    )
  }
}

const List = ({ schools }) => (
  <div>
    <div className="schoolList">
      {
        schools.map(({ uuid, name, avgGraduateSalary, jobPlacementRate, lengthInWeeks, isOnline, photoURI, basePrice, paymentType, tracks, campusLocations }) => (
          <div className="card" key={uuid}>
            <SchoolLogo photoURI={photoURI} />
            <div className="schoolInfoWrapper">
              <div className="name">
                {name}
              </div>
              <LocationBar isOnline={isOnline} campusLocations={campusLocations} />
              <PriceBar basePrice={basePrice} paymentType={paymentType} />
              <LengthBar length={lengthInWeeks}/>
              <SalaryBar avgGraduateSalary={avgGraduateSalary} />
              <JobPlacementBar jobPlacementRate={jobPlacementRate} />
            </div>
          </div>
        ))
      }
    </div>
  </div>
);

function SchoolLogo(uriWrapper) {
  let url;
  if (process.env.NODE_ENV === 'development') {
    url = window.location.protocol + "//localhost:8080/s3/schools/" + uriWrapper.photoURI;
  } else {
    url = window.location.protocol + window.location.hostname + "/s3/schools/" + uriWrapper.photoURI;
  }
  return <img src={url} alt="SchoolLogo"/>
};

function LocationBar(locationWrapper) {
  if (locationWrapper.isOnline === true) {
    return (
      <div className="location">
        <img src={LocationIcon} alt="Location"/>
        <div className="campusLocations">Online</div>
      </div>
    );
  }
  let list = "";
  if (locationWrapper.campusLocations != null) {
    for (let i = 0; i < locationWrapper.campusLocations.length; i++) { 
      list += locationWrapper.campusLocations[i].city
      if (i !== locationWrapper.campusLocations.length - 1) {
        list += ", "
      }
    }
  }
  return (
    <div className="location">
      <img src={LocationIcon} alt="Location"/>
      <div className="campusLocations">
        {list}
      </div>
    </div>
  );
};

function PriceBar(priceWrapper) {
  let paymentType;

  if (priceWrapper.paymentType === "ISA") {
    paymentType = <img src={ISAPayment} alt="Payment Type"/>;
  } else {
    paymentType = <img src={UpfrontPayment} alt="PaymentType"/>;
  }

  return (
    <div className="price">
      <div className="basePrice">
        ${priceWrapper.basePrice}
      </div>
      <div className="paymentType">
        {paymentType}
      </div>
    </div>
  );
};

function LengthBar(lengthWrapper) {
  return (
    <div className="length">
      <img src={LengthIcon} alt="Length"/>
      <div className="lengthInWeeksLabel">Length</div>
      <div className="lengthInWeeks">{lengthWrapper.length} weeks</div>
    </div>
  );
};

function SalaryBar(salaryWrapper) {
  return (
    <div className="salary">
      <img src={SalaryIcon} alt="Salary"/>
      <div className="avgGraduateSalaryLabel">Average Graduate Salary</div>
      <div className="avgGraduateSalary">${salaryWrapper.avgGraduateSalary}</div>
    </div>
  );
};

function JobPlacementBar(jobPlacementWrapper) {
  return (
    <div className="jobPlacement">
      <img src={JobPlacementIcon} alt="Job Placement"/>
      <div className="jobPlacementRateLabel">Job Placement Rate</div>
      <div className="jobPlacementRate">{jobPlacementWrapper.jobPlacementRate}%</div>
    </div>
  );
};

export default Search;
