import React, { Component } from 'react';
import moment from 'moment';
import Reviewer from './Reviewer.jsx';
import './Review.css';

class Review extends Component {

  render() {
    const { 
      title,
      allText,
      teachingScore,
      courseworkScore,
      atmosphereScore,
      careerPreparationScore,
      overallScore ,
      helpfulUpvotes,
      helpfulDownvotes,
      hasJob,
      salaryBefore,
      salaryAfter,
      schoolLocation,
      schoolGraduationTimestamp,
      jobLocation,
      jobStartTimestamp,
      createdTimestamp
    } = this.props.review;

    const schoolLocationName = schoolLocation.city.name;
    const jobLocationName = jobLocation.city.name;
    const schoolGradDate = moment.unix(schoolGraduationTimestamp).format('MMM YYYY');
    const jobStartDate = moment.unix(jobStartTimestamp).format('MMM YYYY');
    const createdDate = moment.unix(createdTimestamp).format('MM/DD/YYYY');

    return (
      <div className="reviewWrapper">
        <Reviewer 
        schoolLocationName={schoolLocationName} 
        hasJob={hasJob} 
        salaryBefore={salaryBefore} 
        salaryAfter={salaryAfter} 
        jobLocationName={jobLocationName} 
        jobStartDate={jobStartDate}
        createdDate={createdDate} />
        <ReviewScore />
        <ReviewText title={title} allText={allText} />
      </div>
    );
  }
}

const ReviewScore = ({ overallScore, teachingScore, courseworkScore, atmosphereScore, careerPreparationScore }) => (
  <div/>
);

const ReviewText = ({ title, allText }) => (
  <div>
    <div className="reviewTextTitle">{title}</div>
    <div className="reviewTextDescription">{allText}</div>
  </div>
);

export default Review;
