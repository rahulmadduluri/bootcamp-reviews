import React, { Component } from 'react';
import StudentMaleIcon from '../../images/student_male_icon.png';
import StudentFemaleIcon from '../../images/student_female_icon.png';
import SchoolIcon from '../../images/school_icon.png';
import JobIcon from '../../images/job_placement_icon.png';
import FinancesIcon from '../../images/finances_icon.png';

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
      hasJob,
      schoolGradDate,
      salaryBefore,
      salaryAfter,
      jobLocationName,
      jobStartDate ,
      createdDate
    } = this.props;

    return (
      <div className="reviewerWrapper">
        <div className="topBar">
          <div className="reviewerBar"><img src={this.state.gender ? StudentMaleIcon : StudentFemaleIcon} alt="Student_Icon" /></div>
          <div className="reviewerBarTitle reviewerBar">Verified Student</div>
          <div className="reviewText reviewerBar">{createdDate}</div>
          <button className="is-small button is-secondary reviewerBar" onClick={this.didClickExpand}><strong>About Student</strong></button>
        </div>
        {
          this.state.isExpanded ? (
            <div className="bottomStats columns is-mobile">
              <div className="column">
                <div className="reviewerStatHeader"><img src={SchoolIcon} alt="School_Icon" /></div>
                <div className="reviewerStatHeader">School</div>
                <div>
                  <div className="reviewerStat reviewerStatLabel">Campus</div>
                  <div className="reviewerStat">{schoolLocationName}</div>
                </div>
                <div>
                  <div className="reviewerStat reviewerStatLabel">Campus</div>
                </div>
              </div>
              <div className="column">
                <div className="reviewerStatHeader"><img src={JobIcon} alt="Job_Icon" /></div>
                <div className="reviewerStatHeader">Job</div>
              </div>
              <div className="column">
                <div className="reviewerStatHeader"><img src={FinancesIcon} alt="Finances_Icon" /></div>
                <div className="reviewerStatHeader">Finances</div>
              </div>
            </div>
          ) : <div/>
        }
      </div>
    );
  }
}

export default Reviewer;
