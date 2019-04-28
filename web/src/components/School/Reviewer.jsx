import React, { Component } from 'react';
import StudentMaleIcon from '../../images/student_male_icon.png';
import StudentFemaleIcon from '../../images/student_female_icon.png';
import SchoolIcon from '../../images/school_icon.png';
import JobIcon from '../../images/job_placement_icon.png';
import FinancesIcon from '../../images/finances_icon.png';
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
      jobLocationName,
      jobStartDate
    } = this.props;

    return (
      <div className="reviewerWrapper">
        <div className="topBar">
          <div className="reviewerBar"><img src={this.state.gender ? StudentMaleIcon : StudentFemaleIcon} alt="Student_Icon" /></div>
          <div className="reviewerBarTitle reviewerBar">Verified Student</div>
          <button className="is-small button is-secondary reviewerBar" onClick={this.didClickExpand}><strong>About Student</strong></button>
        </div>
        {
          this.state.isExpanded ? (
            <div className="bottomStats">
              <div className="columns is-mobile">
                <div className="column is-narrow">
                  <div className="reviewerStatHeader"><img src={SchoolIcon} alt="School_Icon" /></div>
                  <div className="reviewerStatHeader">School</div>
                  <ReviewerStat label="Graduated?" stat={didGraduate ? "Yes" : "No"} />
                  <ReviewerStat label="Location" stat={schoolLocationName} />
                  <ReviewerStat label="Grad Date" stat={schoolGradDate} />
                </div>
                <div className="column is-narrow">
                  <div className="reviewerStatHeader"><img src={JobIcon} alt="Job_Icon" /></div>
                  <div className="reviewerStatHeader">Job</div>
                  <ReviewerStat label="Has Job?" stat={didGraduate ? "Yes" : "No"} />
                  <ReviewerStat label="Location" stat={jobLocationName} />
                  <ReviewerStat label="Start Date" stat={jobStartDate} />
                </div>
              </div>
              <div className="reviewSalary">
                <div>
                  <div className="reviewerSalaryLabel">Salary Before</div>
                  <div className="reviewerSalary">{"$" + numToString(salaryBefore)}</div>
                </div>
                <div>
                  <div className="reviewerSalaryLabel">Salary After</div>
                  <div className="reviewerSalary">{"$" + numToString(salaryAfter)}</div>
                </div>
              </div>
            </div>
          ) : <div/>
        }
      </div>
    );
  }
}

const ReviewerStat = ({ label, stat }) => (
  <div>
    <div className="reviewerStat reviewerStatLabel">{label}</div>
    <div className="reviewerStat">{stat}</div>
  </div>
);

export default Reviewer;
