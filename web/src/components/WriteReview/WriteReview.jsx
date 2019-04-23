import React, { Component } from 'react';
import Navbar from '../navbar.jsx';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import './WriteReview.css';
import SchoolLogo from '../Common/SchoolLogo';
import Modal from '../Common/Modal.jsx';
import { numToString } from '../../helpers/helpers.js';

// TODO: Clean this up. This component is a complete MESS

class WriteReview extends Component {

  // school handlers

  // set search flag to true on button press. when results come back 'update' and set flag to false
  didSearchForSchools = () => {
  	this.setState({ shouldFetchSchools: true });
  };
  updateSchoolResults = (schools) => {
  	this.setState({ schoolResults: schools, shouldFetchSchools: false });
  };
  handleUpdateSchoolSearch = (event) => {
  	this.setState({ schoolSearchText: event.target.value });
  };
  handleSelectSchoolButtonPress = () => {
  	this.setState({ schoolDropdownActive: !this.state.schoolDropdownActive });
  };
  handleSelectSchool = (school) => {
  	this.setState({ schoolDropdownActive: !this.state.schoolDropdownActive, schoolUUID: school.uuid, selectedSchool: school });
  };

  handleDidGraduate = (event) => {
  	if (event.target.id === "didGraduateYes") {
  		this.setState({ didGraduate: true });
  	} else {
  		this.setState({ didGraduate: false });
  	}
  };
  handleSelectSchoolGradMonth = (event) => {
  	if (event.target.value === 'none') {
  		this.setState({ schoolGraduationMonth: null });
  	} else {
  		this.setState({ schoolGraduationMonth: event.target.value });
  	}
  };
  handleSelectSchoolGradYear = (event) => {
  	if (event.target.value === 'none') {
  		this.setState({ schoolGraduationYear: null });
  	} else {
  		this.setState({ schoolGraduationYear: event.target.value });
  	}
  };

  // school ratings
  handleTeachingRating = (event) => {
  	if (event.target.value === 'none') {
  		this.setState({ teachingScore: null });
  	} else {
  		this.setState({ teachingScore: event.target.value });
  	}
  };
  handleCourseworkRating = (event) => {
  	if (event.target.value === 'none') {
  		this.setState({ courseworkScore: null });
  	} else {
  		this.setState({ courseworkScore: event.target.value });
  	}
  };
  handleAtmosphereRating = (event) => {
  	if (event.target.value === 'none') {
  		this.setState({ atmosphereScore: null });
  	} else {
  		this.setState({ atmosphereScore: event.target.value });
  	}
  };
  handleCareerPrepRating = (event) => {
  	if (event.target.value === 'none') {
  		this.setState({ careerPreparationScore: null });
  	} else {
  		this.setState({ careerPreparationScore: event.target.value });
  	}
  };
  handleReviewTextUpdated = (event) => {
  	this.setState({ allText: event.target.value });
  };

  // job handlers
  handleSelectJobStartMonth = (event) => {
  	if (event.target.value === 'none') {
  		this.setState({ jobStartMonth: null });
  	} else {
  		this.setState({ jobStartMonth: event.target.value });
  	}
  };
  handleSelectJobStartYear = (event) => {
  	if (event.target.value === 'none') {
  		this.setState({ jobStartYear: null });
  	} else {
  		this.setState({ jobStartYear: event.target.value });
  	}
  };
  handleHasJob = (event) => {
  	if (event.target.id === "hasJobYes") {
  		this.setState({ hasJob: true });
  	} else {
  		this.setState({ hasJob: false });
  	}
  };

  // submit info handlers
  handleDidSelectTerms = (event) => {
  	if (event.target.id === "termsCheckbox") {
  		this.setState({ didAcceptTerms: !this.state.didAcceptTerms });
  	}
  };
  handleSubmit = () => {
  	if (this.state.allText === null || this.state.allText === '' || this.state.teachingScore === null || 
  		this.state.courseworkScore === null || this.state.atmosphereScore === null || this.state.careerPreparationScore === null || 
  		this.state.didGraduate === null || this.state.studentUUID === null || this.state.schoolLocationUUID === null || 
  		this.state.hasJob === null || !this.state.didAcceptTerms) {
  		this.toggleModal();
  	}
  };
  toggleModal = () => {
  	this.setState({ missingFieldsModalIsOpen: !this.state.missingFieldsModalIsOpen })
  };
  generateMissingFieldsText = () => {
  	let missingString = "The following fields are missing: ";
  	if (this.state.allText === null || this.state.allText === '') {
  		missingString += "\n\u2022 description of experience (in words)";
  	}
  	if (this.state.teachingScore === null) {
  		missingString += "\n\u2022 teaching rating";
  	}
  	if (this.state.courseworkScore === null) {
  		missingString += "\n\u2022 coursework rating";
  	}
  	if (this.state.atmosphereScore === null) {
  		missingString += "\n\u2022 atmosphereScore rating";
  	}
  	if (this.state.careerPreparationScore === null) {
  		missingString += "\n\u2022 career preparation rating";
  	}
  	if (this.state.didGraduate === null) {
  		missingString += "\n\u2022 did you graduate?";
  	}
  	if (this.state.schoolUUID === null) {
  		missingString += "\n\u2022 what school did you attend?";
  	}
  	if (this.state.hasJob === null) {
  		missingString += "\n\u2022 did you get a job post-graduation?";
  	}
  	if (!this.state.didAcceptTerms) {
  		missingString += "\n\u2022 accept the terms & conditions";
  	}
  	return missingString;
  };

  state = {
  	// state of page
  	shouldFetchSchools: true,
  	schoolSearchText: "",
  	schoolResults: [],
  	schoolDropdownActive: false,
  	selectedSchool: null,
  	didAcceptTerms: false,
  	missingFieldsModalIsOpen: false,

  	// review params
  	allText: null,
  	teachingScore: null,
  	courseworkScore: null,
  	atmosphereScore: null,
  	careerPreparationScore: null,
  	didGraduate: null,
	studentUUID: null,
	schoolUUID: null,
	schoolLocationUUID: null,
	schoolGraduationMonth: null,
	schoolGraduationYear: null,
	hasJob: null,
	salaryBefore: null,
	salaryAfter: null,
	jobLocationUUID: null,
	jobStartMonth: null,
	jobStartYear: null
  };

  render() {
    return (
		<div>
			<Navbar />
			<div className="pageBackground">
				<Modal 
				  show={this.state.missingFieldsModalIsOpen}
				  onClose={this.toggleModal}
				  titleText="Missing Fields: Try Again"
				  contentText={this.generateMissingFieldsText()}
				  primaryButtonTitle="Okay">
				</Modal>
				<div className="writeReviewInfoWrapper">
					<div className="reviewInfoTitle">Write a Review</div>
					<div className="defaultContainer column is-three-fifths">
						<div className="reviewInfoText">
							Thank you for taking the time to write a review! The <strong>honesty</strong> and <strong>care</strong> you pour into this review will help students just like you make a decision that will shape the rest of their lives.
							<br/><br/>Yours,<br/>The Raft Community
							<br/><br/>
						</div>
						<div className="reviewInfoPrivacyStatement">NOTE: We take your privacy seriously. This review will be completely <strong>ANONYMOUS</strong> to both the school and prospective students.</div>
					</div>
				</div>
				<div className="writeReviewAttendanceWrapper">
					<div className="defaultContainer column is-three-fifths">
						{
							this.schoolAttendanceInfo()
						}
					</div>
				</div>
				{
					(this.state.didGraduate != null) ? (
						<div className="writeReviewScoreWrapper">
							<div className="defaultContainer column is-three-fifths">
								{
									this.schoolReviewScore()
								}
							</div>
						</div>
					) : <div/>
				}

				{
					(this.state.didGraduate != null) ? (
						<div className="writeReviewTextWrapper">
							<div className="defaultContainer column is-three-fifths">
								{
									this.schoolReviewText()
								}
							</div>
						</div>
					) : <div/>
				}

				{
					(this.state.didGraduate != null) ? (
						<div className="writeReviewJobWrapper">
							<div className="defaultContainer column is-three-fifths">
								{
									this.jobInfo()
								}
							</div>
						</div>
					) : <div/>
				}


				{
					(this.state.didGraduate != null) ? (
						<div className="submitReviewWrapper">
							<div className="defaultContainer column is-three-fifths">
								{
									this.submitInfo()
								}
							</div>
						</div>
					) : <div/>
				}
			</div>
		</div>
    );
  }

  // html components

  schoolAttendanceInfo = () => {
	const schoolsQuery = gql`
	  query GetSchools($searchParams: SchoolSearchParams!) {
	    schools(params: $searchParams) {
	      totalNumResults
	      pageNumber
	      schoolResults {
	        uuid
	        name
	        lengthInWeeks
	        isOnline
	        photoURI
	        basePrice
	        paymentType
	        campusLocations {
	          location {
	            uuid
	            city {
	              uuid
	              name
	            }
	            country {
	              uuid
	              name
	            }
	          }
	          medianGraduateSalary
	          jobPlacementRate
	        }
	      }
	    }
	  }
	`;

	const { schoolSearchText, shouldFetchSchools, schoolResults, schoolUUID, didGraduate, schoolDropdownActive, selectedSchool } = this.state;

	const searchParams = {
      pageNumber: 0,
      searchText: schoolSearchText
	};

  	return (
	  <div>
		  <div className="field">
	        <label className="label"><div className="reviewFieldLabel">Which school did you attend?</div></label>

	        {
	          selectedSchool ?
              <div className="media">
                <div className="media-left image">
                  <SchoolLogo photoURI={selectedSchool.photoURI} />
                </div>
                <div className="media-content">
                  <div className="name">{selectedSchool.name}</div>
                </div>
                <br/><br/>
              </div> : <div/>
	        }


	        {
	        	selectedSchool ? <div/> :
			        <div className="field-body">
			        	<div className="field has-addons">
							<div className="control">
								{
									<input className="input" type="text" placeholder="Enter School Name" onChange={this.handleUpdateSchoolSearch} />
								}
							</div>
							<div className="control">
								<a className="button is-info" onClick={ this.didSearchForSchools }>
								  Search
								</a>
							</div>
						</div>
			        </div>
	        }
	    </div>

	    {
	    	selectedSchool ? <div/> : (
		    	// Dropdown -- Which school did you go to?
		    	shouldFetchSchools ?
			       <Query
			          query={schoolsQuery}
			          variables={{ searchParams: searchParams }}
			          onCompleted={data => this.updateSchoolResults(data.schools.schoolResults)}
			        >
			          {({ loading, error, data }) => {
			            if (loading) return <p></p>;
			            if (error) return <p>Error :(</p>;


			          	return (
							<div className="field">
							  <div className="field-body">
								  <div className="control">
								  	<SchoolDropdown 
								  		schools={data.schools.schoolResults} 
								  		handleSelectSchoolButtonPress={this.handleSelectSchoolButtonPress} 
								  		handleSelectSchool={this.handleSelectSchool} 
								  		dropdownActive={schoolDropdownActive} />
								  </div>
							  </div>
							</div>
			          	);
			          }}
			        </Query> : (
						<div className="field">
						  <div className="field-body">
							  <div className="control">
							  	<SchoolDropdown 
							  		schools={schoolResults} 
							  		handleSelectSchoolButtonPress={this.handleSelectSchoolButtonPress} 
							  		handleSelectSchool={this.handleSelectSchool} 
							  		dropdownActive={schoolDropdownActive} />
							  </div>
						  </div>
						</div>
			        )
		    )
	    	
	    }

		{
			// Did Graduate?
			schoolUUID ?
			<div className="field">
			  <label className="label"><div className="reviewFieldLabel">Did you graduate?</div></label>
			  <div className="field-body">
					<div className="field">
					  <input className="is-checkradio" id="didGraduateYes" type="radio" name="exampleRadioDefault" onChange={this.handleDidGraduate} />
					  <label htmlFor="didGraduateYes">Yes</label>
					  <input className="is-checkradio" id="didGraduateNo" type="radio" name="exampleRadioDefault" onChange={this.handleDidGraduate} />
					  <label htmlFor="didGraduateNo">No</label>
					</div>
			    </div>
			</div>
			: <div/>
		}

		{
			// When did you graduate?
			didGraduate ? 
			<div className="field">
			  <label className="label"><div className="reviewFieldLabel">When did you graduate?</div></label>
			  <div className="field-body">
				  <div className="control">
				  	<MonthDropdown handleSelectMonth={this.handleSelectSchoolGradMonth} />
				  	<YearDropdown handleSelectYear={this.handleSelectSchoolGradYear} />
				  </div>
			    </div>
			</div> : <div/>
		}

	  </div>  	
  	);
  };

  schoolReviewScore = () => {
  	return (
  		<div>
			<label className="label"><div className="reviewFieldLabel">Rate the school on a scale of 1 to 10 for the following:</div></label>
			<br/>
			<div className="field">
			  <label className="label"><div className="reviewFieldLabel">Teaching</div></label>
			  <div className="field-body">
				  <div className="control">
				  	<RatingDropdown handleSelectRating={this.handleTeachingRating} />
				  </div>
			    </div>
			</div>
			<div className="field">
			  <label className="label"><div className="reviewFieldLabel">Coursework</div></label>
			  <div className="field-body">
				  <div className="control">
				  	<RatingDropdown handleSelectRating={this.handleCourseworkRating} />
				  </div>
			    </div>
			</div>
			<div className="field">
			  <label className="label"><div className="reviewFieldLabel">Career Preparation (finding jobs, interview prep, etc.)</div></label>
			  <div className="field-body">
				  <div className="control">
				  	<RatingDropdown handleSelectRating={this.handleCareerPrepRating} />
				  </div>
			    </div>
			</div>
			<div className="field">
			  <label className="label"><div className="reviewFieldLabel">Atmosphere (peers, school staff, etc.)</div></label>
			  <div className="field-body">
				  <div className="control">
				  	<RatingDropdown handleSelectRating={this.handleAtmosphereRating} />
				  </div>
			    </div>
			</div>
		</div>
  	);
  };

  schoolReviewText = () => {
  	return (
  		<div>
			<div className="field">
			  <label className="label"><div className="reviewFieldLabel">Describe your experience</div></label>
			  <textarea className="textarea" placeholder="Describe your experience in 500 words or less" rows="10" onChange={this.handleReviewTextUpdated}></textarea>
			</div>
		</div>
  	);
  };

  jobInfo = () => {
  	return (
  		<div>
			<div className="field">
			  <label className="label"><div className="reviewFieldLabel">Did you get a job (in the same field as your schooling) after graduation?</div></label>
			  <div className="field-body">
					<div className="field">
					  <input className="is-checkradio" id="hasJobYes" type="radio" name="exampleRadioDefault2" onChange={this.handleHasJob} />
					  <label htmlFor="hasJobYes">Yes</label>
					  <input className="is-checkradio" id="hasJobNo" type="radio" name="exampleRadioDefault2" onChange={this.handleHasJob} />
					  <label htmlFor="hasJobNo">No</label>
					</div>
			    </div>
			</div>
			{
				this.state.hasJob ? (
					<div className="field">
					  <label className="label"><div className="reviewFieldLabel">When did you get a job?</div></label>
					  <div className="field-body">
						  <div className="control">
						  	<MonthDropdown handleSelectMonth={this.handleSelectJobStartMonth} />
						  	<YearDropdown handleSelectYear={this.handleSelectJobStartYear} />
						  </div>
					    </div>
					</div>
				) : <div/>
			}
			{
				this.state.hasJob ? (
					<div>
						<div className="field">
						  <label className="label"><div className="reviewFieldLabel">What was your salary before attending the school? [OPTIONAL]</div></label>
						  <div className="field-body">
							  <div className="control">
							  	<SalaryDropdown defaultTitle="Salary Before" handleSelectSalary={this.handleSelectSalaryBefore} />
							  </div>
						    </div>
						</div>
						<div className="field">
						  <label className="label"><div className="reviewFieldLabel">What was your salary after attending the school? [OPTIONAL]</div></label>
						  <div className="field-body">
							  <div className="control">
							  	<SalaryDropdown defaultTitle="Salary After" handleSelectSalary={this.handleSelectSalaryAfter} />
							  </div>
						    </div>
						</div>
					</div>
				) : <div/>
			}
		</div>
  	);
  };

  submitInfo = () => {
 	return (
	  <div>
		<div className="field">
		  <input className="is-checkradio" id="termsCheckbox" type="checkbox" name="termsCheckbox" onChange={this.handleDidSelectTerms} />
		  <label htmlFor="termsCheckbox">I agree to the <a href="#">terms and conditions</a></label>
		</div>
	    <div className="buttons">
	      <a className="button is-primary" key="submit" onClick={this.handleSubmit}><strong>Submit</strong></a>
	    </div>
	  </div>
 	);
  };

}

const SchoolDropdown = ({ schools, handleSelectSchoolButtonPress, handleSelectSchool, dropdownActive }) => (
	<div className={dropdownActive ? "dropdown is-active" : "dropdown"}>
	  <div className="dropdown-trigger">
	    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu2" onClick={handleSelectSchoolButtonPress}>
	      <span>Select School</span>
	      <span className="icon is-small">
	        <i className="fas fa-angle-down" aria-hidden="true"></i>
	      </span>
	    </button>
	  </div>
	  <div className="dropdown-menu" id="dropdown-menu2" role="menu">
	    <div className="dropdown-content">
		  {
		      	schools.map(
		        ({
		          uuid,
		          name,
		          photoURI
		        }, index) => (

		          <a key={uuid} className="dropdown-item" value={uuid} onClick={() => handleSelectSchool(schools[index])} >
	                  <div className="media">
	                    <div className="media-left image">
	                      <SchoolLogo photoURI={photoURI} />
	                    </div>
	                    <div className="media-content">
	                      <div className="name">{name}</div>
	                    </div>
	                  </div>
	               </a>
		        )
		      )
		  }
	    </div>
	  </div>
	</div>
);

const MonthDropdown = ({ handleSelectMonth }) => (
  <div className="select">
      {
		<select onChange={handleSelectMonth}>
		  <option value={'none'}>Select Month</option>
		  {
		      	["January","February","March","April","May","June","July","August","September","October","November","December"].map(
		        (month, index) => (
		          <option key={"month:"+index} value={index+1}>{month}</option>
		        )
		      )
		  }
		</select>
    }
  </div>
);

const YearDropdown = ({ handleSelectYear }) => (
  <div className="select">
      {
		<select onChange={handleSelectYear}>
		  <option value={'none'}>Select Year</option>
		  {
		      	["2013","2014","2015","2016","2017","2018","2019"].map(
		        (year) => (
		          <option key={"year:"+year} value={year}>{year}</option>
		        )
		      )
		  }
		</select>
    }
  </div>
);

const RatingDropdown = ({ handleSelectRating }) => (
  <div className="select">
      {
		<select onChange={handleSelectRating}>
		  <option value={'none'}>Select Rating</option>
		  {
		      	["1 (scam -- unethical and/or abusive)", 
		      	"2 (terrible -- worse than self-studying)", 
		      	"3 (bad -- no better than self-studying)", 
		      	"4 (subpar -- would not recommend to a friend)", 
		      	"5 (mediocre -- would not recommend to a friend)",
		      	"6 (acceptable -- might recommend to a friend)",
		      	"7 (good -- might recommend to a friend)",
		      	"8 (great -- would probably recommend to a friend)",
		      	"9 (amazing -- would definitely recommend to a friend)",
		      	"10 (perfect -- would definitely recommend to anyone)"].map(
		        (rating, index) => (
		          <option key={"rating:"+index} value={index+1}>{rating}</option>
		        )
		      )
		  }
		</select>
    }
  </div>
);

const SalaryDropdown = ({ defaultTitle, handleSelectSalary }) => (
  <div className="select">
      {
		<select onChange={handleSelectSalary}>
		  <option value={'none'}>{defaultTitle}</option>
		  {
		      	[20000,30000,40000,50000,60000,70000,80000,90000,100000,110000,120000,130000,140000,150000].map(
		        (year) => (
		          <option key={"year:"+year.toString()} value={year}>${numToString(year)}</option>
		        )
		      )
		  }
		</select>
    }
  </div>
);

export default WriteReview;
