import React, { Component } from 'react';
import Review from './Review.jsx';
import ReviewScore from './ReviewScore.jsx';
import { formatFloat } from '../../helpers/helpers.js';

class ReviewList extends Component {

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    let D = document;
    let docHeight = Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );

    if ((window.innerHeight + window.pageYOffset) >= docHeight) {
      this.props.onLoadMore();
    }
  };

  render() {
    const { totalNumReviews } = this.props.reviewSummary;

    return (
      <div>
        <div className="schoolReviewsHeader">
          <div className="schoolReviewsLabel">Reviews</div>
          <div className="schoolReviewsCount">&#8226; {totalNumReviews} student reviews</div>
          <div className="schoolReviewsNewReview"><a className="button is-primary is-small" href='/reviews/new'>Write a Review</a></div>
        </div>
        <ReviewAverages reviewSummary={this.props.reviewSummary} />
        <ul className="">
          {this.props.reviews.map((review) => (
            <li key={"review:"+review.uuid}>
              <Review review={review} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const ReviewAverages = ({ reviewSummary }) => {
  const { overallScore, teachingScore, courseworkScore, atmosphereScore, careerPreparationScore } = reviewSummary;
  return (
    <ReviewScore
      overallScore={formatFloat(overallScore, 1)} 
      teachingScore={formatFloat(teachingScore, 1)} 
      courseworkScore={formatFloat(courseworkScore, 1)} 
      atmosphereScore={formatFloat(atmosphereScore, 1)}
      careerPreparationScore={formatFloat(careerPreparationScore, 1)}/>
  );
};


export default ReviewList;
