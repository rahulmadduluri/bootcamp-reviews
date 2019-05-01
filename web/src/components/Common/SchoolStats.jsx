import React from 'react';
import LocationIcon from '../../images/location_icon.png';
import ISAPayment from '../../images/isa_payment.png';
import UpfrontPayment from '../../images/upfront_payment.png';
import LengthIcon from '../../images/length_icon.png';
import SalaryIcon from '../../images/finances_icon.png';
import TeachingIcon from '../../images/teaching_icon.png';
import { numToString } from '../../helpers/helpers.js';

export const LocationBar = locationWrapper => {
  let list = '';
  if (locationWrapper.campusLocations) {
    for (let i = 0; i < locationWrapper.campusLocations.length; i++) {
      list += locationWrapper.campusLocations[i].location.city.name;
      if (i !== locationWrapper.campusLocations.length - 1) {
        list += ', ';
      }
    }
  }
  if (locationWrapper.showAllLocationsLabel && locationWrapper.showAllLocationsLabel === true) {
    return (
      <div className="location">
        <img src={LocationIcon} alt="Location" />
        <div className="campusLocationsLabel">Locations</div>
        <div className="campusLocations">{list}</div>
      </div>
    );
  }
  return (
    <div className="location">
      <img src={LocationIcon} alt="Location" />
      <div className="campusLocations">{list}</div>
    </div>
  );
};

export const PriceBar = priceWrapper => {
  let paymentType;

  if (priceWrapper.paymentType === 'ISA') {
    paymentType = <img src={ISAPayment} alt="Payment Type" />;
  } else {
    paymentType = <img src={UpfrontPayment} alt="PaymentType" />;
  }

  return (
    <div className="price">
      <div className="basePrice">${numToString(priceWrapper.basePrice)}</div>
      <div className="paymentType">{paymentType}</div>
    </div>
  );
};

export const LengthBar = lengthWrapper => {
  if (lengthWrapper.length) {
    return (
      <div className="length">
        <div className="lengthImage">
          <img src={LengthIcon} alt="Length" />
        </div>
        <div className="lengthInWeeksLabel">Length</div>
        <div className="lengthInWeeks">{lengthWrapper.length} weeks</div>
      </div>
    );
  } else {
    return (
      <div className="length">
        <div className="lengthImage">
          <img src={LengthIcon} alt="Length" />
        </div>
        <div className="lengthInWeeksLabel">Length</div>
        <div className="lengthInWeeks">?</div>
      </div>
    );
  }
};

export const SalaryBar = locationWrapper => {
  let medianGraduateSalary = 0;

  for (let i = 0; i < locationWrapper.campusLocations.length; i++) {
    medianGraduateSalary +=
      locationWrapper.campusLocations[i].medianGraduateSalary;
  }
  if (locationWrapper.campusLocations.length > 0) {
    medianGraduateSalary = Math.round(
      medianGraduateSalary / locationWrapper.campusLocations.length,
    );
  }

  return (
    <div className="salary">
      <div className="salaryImage">
        <img src={SalaryIcon} alt="Salary" />
      </div>
      <div className="medianGraduateSalaryLabel">Median Graduate Salary</div>
      <div className="medianGraduateSalaryValue">
        ${numToString(medianGraduateSalary)}
      </div>
    </div>
  );
};

export const StudentTeacherRatioBar = studentTeachRatioWrapper => {
  return (
    <div className="studentTeacherRatio">
      <div className="studentTeacherRatioImage">
        <img src={TeachingIcon} alt="Teaching Icon" />
      </div>
      <div className="studentTeacherRatioLabel">Student Teacher Ratio</div>
      <div className="studentTeacherRatioValue">{studentTeachRatioWrapper.studentTeacherRatio ? studentTeachRatioWrapper.studentTeacherRatio+":1" : "?"}</div>
    </div>
  );
};
