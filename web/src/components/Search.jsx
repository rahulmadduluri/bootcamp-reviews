import React, { Component } from 'react';
import './Search.css';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Navbar from './navbar.jsx';
import FilterBar from './filterbar.jsx';
import Pagination from './pagination.jsx';
import LocationIcon from '../images/location_icon.png';
import ISAPayment from '../images/isa_payment.png';
import UpfrontPayment from '../images/upfront_payment.png';
import LengthIcon from '../images/length_icon.png';
import SalaryIcon from '../images/salary_icon.png';
import JobPlacementIcon from '../images/job_placement_icon.png';
import { numToString } from "../helpers/helpers.js";

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
        schools.map(({ uuid, name, lengthInWeeks, isOnline, photoURI, basePrice, paymentType, campusLocations }) => (
          <div className="card" key={uuid}>
            <SchoolLogo photoURI={photoURI} />
            <div className="schoolInfoWrapper">
              <div className="name">
                {name}
              </div>
              <LocationBar campusLocations={campusLocations} />
              <PriceBar basePrice={basePrice} paymentType={paymentType} />
              <LengthBar length={lengthInWeeks}/>
              <SalaryBar campusLocations={campusLocations} />
              <JobPlacementBar campusLocations={campusLocations} />
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
  let list = "";
  if (locationWrapper.campusLocations) {
    for (let i = 0; i < locationWrapper.campusLocations.length; i++) {
      list += locationWrapper.campusLocations[i].location.city
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
        ${numToString(priceWrapper.basePrice)}
      </div>
      <div className="paymentType">
        {paymentType}
      </div>
    </div>
  );
};

function LengthBar(lengthWrapper) {
  if (lengthWrapper.length) {
    return (
      <div className="length">
        <div className="lengthImage"><img src={LengthIcon} alt="Length"/></div>
        <div className="lengthInWeeksLabel">Length</div>
        <div className="lengthInWeeks">{lengthWrapper.length} weeks</div>
      </div>
    );
  } else {
    return (
      <div className="length">
        <div className="lengthImage"><img src={LengthIcon} alt="Length"/></div>
        <div className="lengthInWeeksLabel">Length</div>
        <div className="lengthInWeeks">?</div>
      </div>
    );
  }
};

function SalaryBar(locationWrapper) {
  let medianGraduateSalary = 0;

  for (let i = 0; i < locationWrapper.campusLocations.length; i++) { 
    medianGraduateSalary += locationWrapper.campusLocations[i].medianGraduateSalary
  }
  if (locationWrapper.campusLocations.length > 0) {
    medianGraduateSalary = Math.round(medianGraduateSalary / locationWrapper.campusLocations.length);
  }

  return (
    <div className="salary">
      <div className="salaryImage"><img src={SalaryIcon} alt="Salary"/></div>
      <div className="medianGraduateSalaryLabel">Median Graduate Salary</div>
      <div className="medianGraduateSalary">${numToString(medianGraduateSalary)}</div>
    </div>
  );
};

function JobPlacementBar(locationWrapper) {
  let jobPlacementRate = 0;

  for (let i = 0; i < locationWrapper.campusLocations.length; i++) { 
    jobPlacementRate += locationWrapper.campusLocations[i].jobPlacementRate
  }
  if (locationWrapper.campusLocations.length > 0) {
    jobPlacementRate = Math.round(jobPlacementRate / locationWrapper.campusLocations.length * 100) / 100;
  }

  return (
    <div className="jobPlacement">
      <div className="jobPlacementImage"><img src={JobPlacementIcon} alt="Job Placement"/></div>
      <div className="jobPlacementRateLabel">Job Placement Rate</div>
      <div className="jobPlacementRate">{jobPlacementRate}%</div>
    </div>
  );
};

export default Search;
