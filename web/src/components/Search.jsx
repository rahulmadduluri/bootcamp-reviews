import React, { Component } from 'react';
import './Search.css';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Navbar from './navbar.jsx';
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
    `;

    return (
      <div>
        <Navbar />
        <Query
          query={schoolsQuery}
          variables={ { searchParams:this.props.currentSearchParams } }
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return <List schools={data.schools}/>
          }}
        </Query>      
      </div>
    )
  }
}

const List = ({ schools }) => (
  <div>
    <div className="list">
      {
        schools.map(({ uuid, name, avgGraduateSalary, jobPlacementRate, lengthInWeeks, isOnline, photoURI, basePrice, paymentType, tracks, campusLocations }) => (
          <div className="list-row" key={uuid}>
            <div className="schoolInfoWrapper">
              <div className="name">
                {name}
              </div>
              <LocationBar isOnline={isOnline} />
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

function LocationBar(isOnlineWrapper) {
  if (isOnlineWrapper.isOnline === true) {
    return (
      <div className="location">
        <img src={LocationIcon} alt="Location"/>
        <div className="campusLocations">Online</div>
      </div>
    );
  }
  return (
    <div className="location">
      <img src={LocationIcon} alt="Location"/>
      <div className="campusLocations">Not Online</div>
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
