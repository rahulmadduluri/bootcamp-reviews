import React, { Component } from 'react';
import moment from 'moment';
import Reviewer from './Reviewer.jsx';
import './Review.css';

class Review extends Component {

  render() {
    const { 
      title,
      studentExperience,
      studentAdvice,
      teachingScore,
      courseworkScore,
      atmosphereScore,
      careerPreparationScore,
      overallScore ,
      helpfulUpvotes,
      helpfulDownvotes,
      didGraduate,
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
        <div className="reviewTitle">"{title}"</div>
        <div className="reviewDate">{createdDate}</div>
        <Reviewer 
        schoolLocationName={schoolLocationName}
        didGraduate={didGraduate}
        schoolGradDate={schoolGradDate}
        hasJob={hasJob} 
        salaryBefore={salaryBefore} 
        salaryAfter={salaryAfter} 
        jobLocationName={jobLocationName} 
        jobStartDate={jobStartDate} />
        <ReviewScore 
        overallScore={overallScore} 
        teachingScore={teachingScore} 
        courseworkScore={courseworkScore} 
        atmosphereScore={atmosphereScore}
        careerPreparationScore={careerPreparationScore}/>
        <ReviewText studentExperience={studentExperience} studentAdvice={studentAdvice} />
      </div>
    );
  }
}

const ReviewScore = ({ overallScore, teachingScore, courseworkScore, atmosphereScore, careerPreparationScore }) => (
  <div className="reviewScoreWrapper">
    <div className="columns is-mobile">
      <div className="column is-narrow">
        <div className="reviewOverallScore">
          <div className="scoreText">{overallScore}</div>
        </div>
      </div>
      <SecondaryScoreRating score={careerPreparationScore} title={"Career Prep"} />
      <SecondaryScoreRating score={teachingScore} title={"Teaching"} />
      <SecondaryScoreRating score={courseworkScore} title={"Coursework"} />
      <SecondaryScoreRating score={atmosphereScore} title={"Atmosphere"} />
    </div>
  </div>
);

const SecondaryScoreRating = ({ score, title }) => (
  <div className="column is-narrow">
    <div className="secondaryScoreWrapper">
      <div className="secondaryScore">{score}</div>
      <div className="secondaryScoreLabel">{title}</div>
    </div>
  </div>
);

const ReviewText = ({ studentExperience, studentAdvice }) => (
  <div>
    <div>
      <div className="reviewTextTitle">My Experience</div>
      <div className="reviewTextDescription">{studentExperience}</div>
    </div>
    {
      studentAdvice ? (
        <div>
          <br/>
          <div>
            <div className="reviewTextTitle">My Advice for Prospective Students</div>
            <div className="reviewTextDescription">{studentAdvice}</div>
          </div>
        </div>
      ) : <div/>
    }
  </div>
);

export default Review;
