import React from 'react';

const ReviewScore = ({ overallScore, teachingScore, courseworkScore, atmosphereScore, careerPreparationScore }) => (
  <div className="reviewScoreWrapper">
    <div className="columns is-mobile">
      <div className="column is-narrow">
        <div className="reviewOverallScore ">
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

export default ReviewScore;
