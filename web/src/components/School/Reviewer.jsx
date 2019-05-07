import React, { Component } from 'react';
import StudentMaleIcon from '../../images/student_male_icon.png';
import StudentFemaleIcon from '../../images/student_female_icon.png';
import { numToString } from '../../helpers/helpers.js';

class Reviewer extends Component {

  state = {
    isExpanded: false,
    gender: (Math.floor(Math.random() * 2) === 0)
  };

  didClickExpand = () => {
    this.setState({ isExpanded: !this.state.isExpanded })
  };

  render() {
    const { 
      schoolLocationName,
      didGraduate,
      hasJob,
      schoolGradDate,
      salaryBefore,
      salaryAfter,
      companyLocationName,
      jobFoundDate
    } = this.props;

    return (
      <div className="reviewerWrapper">
        <div className="topBar">
          <div className="reviewerBar"><img src={this.state.gender ? StudentMaleIcon : StudentFemaleIcon} alt="Student_Icon" /></div>
          <div className="reviewerBarTitle reviewerBar">Verified Student</div>
          {
            this.state.isExpanded ? (
              <button className="is-small button is-primary reviewerBar" onClick={this.didClickExpand}><strong>About Student</strong></button>
            ) : (
              <button className="is-small button is-secondary reviewerBar" onClick={this.didClickExpand}><strong>About Student</strong></button>
            )
          }
        </div>
        {
          this.state.isExpanded ? (
            <div className="bottomStats">
              <div className="columns">
                <div className="column is-narrow">
                  <div className="reviewerStatHeader">School</div>
                  <ReviewerStat label="Graduated?" stat={didGraduate ? "Yes" : "No"} />
                  <ReviewerStat label="Location" stat={schoolLocationName} />
                  <ReviewerStat label="Grad Date" stat={schoolGradDate} />
                </div>
                <div className="column is-narrow">
                  <div className="reviewerStatHeader">Job</div>
                  <ReviewerStat label="Has Job?" stat={hasJob ? "Yes" : "No"} />
                  <ReviewerStat label="Location" stat={companyLocationName} />
                  <ReviewerStat label="Offer Date" stat={jobFoundDate} />
                </div>
                {
                  salaryAfter ? (
                    <div className="column is-narrow">
                      <div className="reviewerStatHeader">Salary</div>
                      <ReviewerStat label="Salary Before" stat={"$" + numToString(salaryBefore)} />
                      <ReviewerStat label="Salary After" stat={"$" + numToString(salaryAfter)} />
                    </div>
                  ) : <div/>
                }
              </div>
            </div>
          ) : <div/>
        }
      </div>
    );
  }
}

const ReviewerStat = ({ label, stat }) => (
  <div className="">
    <div className="reviewerStat reviewerStatLabel">{label}</div>
    <div className="reviewerStat">{stat}</div>
  </div>
);

export default Reviewer;
