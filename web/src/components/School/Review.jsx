import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import Reviewer from './Reviewer.jsx';
import ReviewText from './ReviewText.jsx';
import auth from '../../Auth/auth.jsx';
import Modal from '../Common/Modal.jsx';
import './Review.css';

class Review extends Component {

  state = {
    reviewUUID: this.props.review.uuid,
    helpfulUpvotes: this.props.review.helpfulUpvotes,
    helpfulDownvotes: this.props.review.helpfulDownvotes,

    votedHelpful: false,
    votedUnhelpful: false,
    isSubmitHelpfulModalOpen: false
  };

  onClickHelpful = async () => {
    if (!auth.isAuthenticated()) {
      auth.login();
      return;
    }

    const helpfulMutation = gql`
    mutation SubmitHelpfulVote($reviewUUID: ID!, $helpful: Boolean!) {
      submitHelpfulVote(reviewUUID: $reviewUUID, helpful: $helpful)
    }
    `;

    const res = await this.props.client.mutate({
      mutation: helpfulMutation,
      variables: { reviewUUID: this.state.reviewUUID, helpful: true }
    }).catch(() => this.toggleModal());

    if (res && res.data.submitHelpfulVote === true) {
      this.setState({ helpfulUpvotes: this.state.helpfulUpvotes + 1, votedHelpful: true });
    }
  };

  onClickUnhelpful = async () => {
    if (!auth.isAuthenticated()) {
      auth.login();
      return;
    }

    const helpfulMutation = gql`
    mutation SubmitHelpfulVote($reviewUUID: ID!, $helpful: Boolean!) {
      submitHelpfulVote(reviewUUID: $reviewUUID, helpful: $helpful)
    }
    `;

    const res = await this.props.client.mutate({
      mutation: helpfulMutation,
      variables: { reviewUUID: this.state.reviewUUID, helpful: false }
    }).catch(() => this.toggleModal());

    if (res && res.data.submitHelpfulVote === true) {
      this.setState({ helpfulDownvotes: this.state.helpfulDownvotes + 1, votedUnhelpful: true });
    }
  };

  toggleModal = () => {
    this.setState({ isSubmitHelpfulModalOpen: !this.state.isSubmitHelpfulModalOpen })
  };

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
        <Modal 
          show={this.state.isSubmitHelpfulModalOpen}
          onClose={this.toggleModal}
          titleText="Failed to Submit Vote"
          contentText="vote already submitted"
          primaryButtonTitle="Okay">
        </Modal>
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
        <ReviewText
          studentExperience={studentExperience}
          studentAdvice={studentAdvice} />
        <ReviewHelpful
          votedHelpful={this.state.votedHelpful}
          votedUnhelpful={this.state.votedUnhelpful}
          helpfulUpvotes={this.state.helpfulUpvotes}
          helpfulDownvotes={this.state.helpfulDownvotes} 
          onClickHelpful={this.onClickHelpful}
          onClickUnhelpful={this.onClickUnhelpful}/>
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

const ReviewHelpful = ({ votedHelpful, votedUnhelpful, helpfulUpvotes, helpfulDownvotes, onClickHelpful, onClickUnhelpful }) => (
  <div className="reviewHelpfulwrapper">
    <div className="reviewHelpfulCount">{helpfulUpvotes} out of {helpfulUpvotes+helpfulDownvotes}</div>
    <div className="reviewHelpfulLabel">people found this review helpful</div>
    <br/>
    {
      votedHelpful ? (
        <button className="reviewHelpfulButton button is-small is-primary" onClick={onClickHelpful}><strong>Helpful</strong></button>
      ) : (
        <button className="reviewHelpfulButton button is-small is-secondary" onClick={onClickHelpful}><strong>Helpful</strong></button>
      )
    }
    {
      votedUnhelpful ? (
        <button className="reviewHelpfulButton button is-small is-primary" onClick={onClickUnhelpful}><strong>Unhelpful</strong></button>
      ) : (
        <button className="reviewHelpfulButton button is-small is-secondary" onClick={onClickUnhelpful}><strong>Unhelpful</strong></button>
      )
    }
  </div>
);

export default withApollo(Review);
