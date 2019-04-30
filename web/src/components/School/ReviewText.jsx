import React, { Component } from 'react';
import Reviewer from './Reviewer.jsx';
import TextTruncate from 'react-text-truncate';
import './Review.css';

class ReviewText extends Component {

  state = {
    isStudentExperienceExpanded: false,
    isStudentAdviceExpanded: false,
  };

  onClickSeeMoreStudentExperience = () => {
    this.setState({ isStudentExperienceExpanded: !this.state.isStudentExperienceExpanded })
  };
  onClickSeeMoreStudentAdvice = () => {
    this.setState({ isStudentAdviceExpanded: !this.state.isStudentAdviceExpanded })
  };

  render() {
    const { 
      studentExperience,
      studentAdvice
    } = this.props;

    return (
      <div>
        <ReviewTextComponent
          title="My Experience"
          isExpanded={this.state.isStudentExperienceExpanded}
          text={studentExperience}
          seeMoreAction={this.onClickSeeMoreStudentExperience} />
        {
          studentAdvice ? (
          <div>
            <br/>
            <ReviewTextComponent
              title="My Advice for Prospective Students"
              isExpanded={this.state.isStudentAdviceExpanded}
              text={studentAdvice}
              seeMoreAction={this.onClickSeeMoreStudentAdvice} />
          </div>
          ) : <div/>
        }
      </div>
    );
  }
}

const ReviewTextComponent = ({ title, isExpanded, text, seeMoreAction }) => (
  <div>
    <div className="reviewTextTitle">{title}</div>
    {
      isExpanded ? (
        <div>
          <div className="reviewTextDescription">{text}</div>
          <SeeMoreButton title="See Less" action={seeMoreAction} isPrimary={true} />
        </div>
      ) : (
        <TextTruncate
          className="reviewTextDescription"
          line={10}
          text={text}
          truncateText=". . . "
          textTruncateChild={
            <SeeMoreButton title="See More" action={seeMoreAction} isPrimary={false} />
          }
        />
      )
    }
  </div>
);

const SeeMoreButton = ({ title, action, isPrimary }) => (
  <div className="reviewTextButton">
    {
      isPrimary ? (
        <button className="button is-small is-primary" onClick={action}>
          <strong>{title}</strong>
        </button>
      ) : (
        <button className="button is-small is-secondary" onClick={action}>
          <strong>{title}</strong>
        </button>
      )
    }
  </div>
);

export default ReviewText;
