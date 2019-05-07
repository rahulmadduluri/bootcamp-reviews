import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import Navbar from '../navbar.jsx';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import auth from '../../Auth/auth.jsx';
import SchoolLogo from '../Common/SchoolLogo';
import CompanyLogo from '../Common/CompanyLogo';
import Modal from '../Common/Modal.jsx';
import { numToString } from '../../helpers/helpers.js';
import { compose } from 'recompose';
import './WriteReview.css';

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
  handleSelectSchoolDropdownPress = () => {
  	this.setState({ schoolDropdownActive: !this.state.schoolDropdownActive });
  };
  handleSelectSchool = (school) => {
  	this.setState({ schoolDropdownActive: !this.state.schoolDropdownActive, schoolUUID: school.uuid, selectedSchool: school });
  };
  handleSelectSchoolLocation = (event) => {
  	if (event.target.value === 'none') {
  		this.setState({ schoolLocationUUID: null });
  	} else {
  		this.setState({ schoolLocationUUID: event.target.value });
  	}
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
  handleOverallRating = (event) => {
  	if (event.target.value === 'none') {
  		this.setState({ overallScore: null });
  	} else {
  		this.setState({ overallScore: event.target.value });
  	}
  };
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
  handleReviewTitleUpdated = (event) => {
  	this.setState({ title: event.target.value });
  };
  handleStudentExperienceUpdated = (event) => {
  	this.setState({ studentExperience: event.target.value });
  };
  handleStudentAdviceUpdated = (event) => {
  	this.setState({ studentAdvice: event.target.value });
  };

  // job handlers
  didSearchForCompanies = () => {
  	this.setState({ shouldFetchCompanies: true });
  };
  updateCompanyResults = (companies) => {
  	this.setState({ companyResults: companies, shouldFetchCompanies: false });
  };
  handleUpdateCompanySearch = (event) => {
  	this.setState({ companySearchText: event.target.value });
  };
  handleSelectCompanyDropdownPress = () => {
  	this.setState({ companyDropdownActive: !this.state.companyDropdownActive });
  };
  handleSelectCompany = (company) => {
  	this.setState({ companyDropdownActive: !this.state.companyDropdownActive, companyUUID: company.uuid, selectedCompany: company });
  };
  handleHasJob = (event) => {
  	if (event.target.id === "hasJobYes") {
  		this.setState({ hasJob: true });
  	} else {
  		this.setState({ hasJob: false });
  	}
  };
  handleSelectCompanyLocation = (event) => {
  	if (event.target.value === 'none') {
  		this.setState({ companyLocationUUID: null });
  	} else {
  		this.setState({ companyLocationUUID: event.target.value });
  	}
  };
  handleSelectJobFoundMonth = (event) => {
  	if (event.target.value === 'none') {
  		this.setState({ jobFoundMonth: null });
  	} else {
  		this.setState({ jobFoundMonth: event.target.value });
  	}
  };
  handleSelectJobFoundYear = (event) => {
  	if (event.target.value === 'none') {
  		this.setState({ jobFoundYear: null });
  	} else {
  		this.setState({ jobFoundYear: event.target.value });
  	}
  };
  handleSelectSalaryBefore = (event) => {
  	if (event.target.value === 'none') {
  		this.setState({ salaryBefore: null });
  	} else {
  		this.setState({ salaryBefore: event.target.value });
  	}
  };
  handleSelectSalaryAfter = (event) => {
  	if (event.target.value === 'none') {
  		this.setState({ salaryAfter: null });
  	} else {
  		this.setState({ salaryAfter: event.target.value });
  	}
  };

  // submit info handlers
  handleDidSelectTerms = (event) => {
  	if (event.target.id === "termsCheckbox") {
  		this.setState({ didAcceptTerms: !this.state.didAcceptTerms });
  	}
  };
  handleSubmit = async () => {
  	// if missing field show modal, else, submit review
  	if (this.state.title === null || this.state.studentExperience === null || this.state.studentExperience === '' || this.state.overallScore === null || this.state.teachingScore === null || 
  		this.state.courseworkScore === null || this.state.atmosphereScore === null || this.state.careerPreparationScore === null || 
  		this.state.didGraduate === null || this.state.schoolLocationUUID === null || 
  		this.state.hasJob === null || !this.state.didAcceptTerms) {
  		this.toggleModal();
  	} else {
	    const submitReviewMutation = gql`
			mutation SubmitReview($reviewParams:NewReviewParams!) {
				submitReview(reviewParams: $reviewParams)
			}
	    `;

	    // create review params object
	    const { studentUUID } = auth.getProfile();
	    const { title, studentExperience, studentAdvice, overallScore, teachingScore, courseworkScore, atmosphereScore, careerPreparationScore, didGraduate, schoolUUID, schoolLocationUUID, 
	    	schoolGraduationMonth, schoolGraduationYear, hasJob, salaryBefore, salaryAfter, companyUUID, companyLocationUUID, jobFoundMonth, jobFoundYear } = this.state;
	    let reviewParams = { title, studentExperience, studentAdvice, overallScore, teachingScore, courseworkScore, atmosphereScore, careerPreparationScore, didGraduate, schoolUUID, schoolLocationUUID, 
	    	schoolGraduationMonth, schoolGraduationYear, hasJob, salaryBefore, salaryAfter, companyUUID, companyLocationUUID, jobFoundMonth, jobFoundYear, studentUUID };

	    const { data } = await this.props.client.mutate({
	    	mutation: submitReviewMutation,
	        variables: { reviewParams: reviewParams }
	    });

	    if (data.submitReview === true) {
	    	this.props.history.push('/home');
	    }
  	}
  };
  toggleModal = () => {
  	this.setState({ missingFieldsModalIsOpen: !this.state.missingFieldsModalIsOpen })
  };
  generateMissingFieldsText = () => {
  	let missingString = "The following fields are missing: ";
  	if (this.state.title === null || this.state.title === '') {
  		missingString += "\n\u2022 review title";
  	}
  	if (this.state.studentExperience === null || this.state.studentExperience === '') {
  		missingString += "\n\u2022 description of experience (in words)";
  	}
  	if (this.state.overallScore === null) {
  		missingString += "\n\u2022 overall rating";
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
  	if (this.state.schoolLocationUUID === null) {
  		missingString += "\n\u2022 school location";
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
  	shouldFetchCompanies: true,
  	companySearchText: "",
  	companyResults: [],
  	companyDropdownActive: false,
  	selectedCompany: null,
  	didAcceptTerms: false,
  	missingFieldsModalIsOpen: false,

  	// review params

  	// school
  	title: null,
  	studentExperience: null,
  	studentAdvice: null,
  	overallScore: null,
  	teachingScore: null,
  	courseworkScore: null,
  	atmosphereScore: null,
  	careerPreparationScore: null,
  	didGraduate: null,
	schoolUUID: null,
	schoolLocationUUID: null,
	schoolGraduationMonth: null,
	schoolGraduationYear: null,

	// job
	hasJob: null,
	salaryBefore: null,
	salaryAfter: null,
	companyUUID: null,
	companyLocationUUID: null,
	jobFoundMonth: null,
	jobFoundYear: null
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
						<div className="reviewInfoPrivacyStatement">We take your privacy seriously. This review will be completely <strong>ANONYMOUS</strong> to both the school and prospective students.</div>
						<br/>
						<div className="reviewInfoPrivacyStatement">required fields have <a className="required"/></div>
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
	              name
	            }
	            country {
	              name
	            }
	          }
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
	        <label className="label"><div className="reviewFieldLabel required">Which school did you attend?</div></label>

	        {
	          // Show the school if the user has already selected it
	          selectedSchool ?
              <div className="media">
                <div className="media-left image is-32x32">
                  <SchoolLogo photoURI={selectedSchool.photoURI} />
                </div>
                <div className="writeReviewSelectedSchoolName">{selectedSchool.name}</div>
                <br/><br/>
              </div> : <div/>
	        }

	        {
	          // Show the school location if the user has already selected a school
	        	selectedSchool ?
	        	<FieldWrapper label={"Which " + selectedSchool.name + " location did you attend?"} required={true}>
				  	<LocationDropdown 
				  		locations={ selectedSchool.campusLocations.map(({location}) => location) } 
				  		handleSelectLocation={this.handleSelectSchoolLocation} 
				  	/>
	        	</FieldWrapper> : <div/>
	        }


	        {
	        	selectedSchool ? <div/> :
			        <div className="field-body">
			        	<div className="field has-addons">
			        		<div className="control">
							    {
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
								          		<FieldWrapper>
												  	<SchoolCompanyDropdown
												  		isSchoolNotCompany={true}
												  		items={data.schools.schoolResults} 
												  		handleSelectDropdownPress={this.handleSelectSchoolDropdownPress} 
												  		handleSelect={this.handleSelectSchool} 
												  		dropdownActive={schoolDropdownActive} />
								          		</FieldWrapper>
								          	);
								          }}
								        </Query> : (
								        	<FieldWrapper>
											  	<SchoolCompanyDropdown 
											  		isSchoolNotCompany={true}
											  		items={schoolResults} 
											  		handleSelectDropdownPress={this.handleSelectSchoolDropdownPress} 
											  		handleSelect={this.handleSelectSchool} 
											  		dropdownActive={schoolDropdownActive} />
								        	</FieldWrapper>
								        )
							    }

			        		</div>
							<div className="control">
								{
									<input className="input" type="text" placeholder="Search for School" onChange={this.handleUpdateSchoolSearch} />
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



			{
				// Did Graduate?
				schoolUUID ?
				<FieldWrapper label="Did you graduate?" required={true}>
				  <input className="is-checkradio" id="didGraduateYes" type="radio" name="exampleRadioDefault" onChange={this.handleDidGraduate} />
				  <label htmlFor="didGraduateYes">Yes</label>
				  <input className="is-checkradio" id="didGraduateNo" type="radio" name="exampleRadioDefault" onChange={this.handleDidGraduate} />
				  <label htmlFor="didGraduateNo">No</label>
				</FieldWrapper>
				: <div/>
			}

			{
				// When did you graduate?
				didGraduate ? 
				<FieldWrapper label="When did you graduate?" required={false}>
				  	<MonthDropdown handleSelectMonth={this.handleSelectSchoolGradMonth} />
				  	<YearDropdown handleSelectYear={this.handleSelectSchoolGradYear} />
				</FieldWrapper> : <div/>
			}

	    </div>  	
  	);
  };

  schoolReviewScore = () => {
  	return (
  		<div>
			<label className="label"><div className="reviewFieldLabel">Rate {this.state.selectedSchool.name} on a scale of 1 to 10 for the following:</div></label>
			<br/>
			<FieldWrapper label="Overall" required={true}>
				<RatingDropdown handleSelectRating={this.handleOverallRating} />
			</FieldWrapper>
			<FieldWrapper label="Teaching" required={true}>
				<RatingDropdown handleSelectRating={this.handleTeachingRating} />
			</FieldWrapper>
			<FieldWrapper label="Coursework" required={true}>
				<RatingDropdown handleSelectRating={this.handleCourseworkRating} />
			</FieldWrapper>
			<FieldWrapper label="Career Preparation (finding jobs, interview prep, etc.)" required={true}>
				<RatingDropdown handleSelectRating={this.handleCareerPrepRating} />
			</FieldWrapper>
			<FieldWrapper label="Atmosphere (peers, school staff, etc.)" required={true}>
				<RatingDropdown handleSelectRating={this.handleAtmosphereRating} />
			</FieldWrapper>
		</div>
  	);
  };

  schoolReviewText = () => {
  	return (
  		<div>
	  		<FieldWrapper label="Review Title" required={true} controlStyle={{width: "350px"}} >
				<input className="input" type="text" placeholder="Review Title" onChange={this.handleReviewTitleUpdated} />
	  		</FieldWrapper>
	  		<FieldWrapper label={"How was your experience at " + this.state.selectedSchool.name + "?"} required={true} controlStyle={{width: "100%"}} >
				  <textarea className="textarea" placeholder={"My experience at " + this.state.selectedSchool.name + " was . . . mediocre? a waste? life-changing?"} rows="10" onChange={this.handleStudentExperienceUpdated}></textarea>
	  		</FieldWrapper>
	  		<FieldWrapper label={"What advice do you have for students considering " + this.state.selectedSchool.name + "?"} required={false} controlStyle={{width: "100%"}} >
				  <textarea className="textarea" placeholder={"A prospective student might just take your advice to heart! No pressure :)"} rows="10" onChange={this.handleStudentAdviceUpdated}></textarea>
	  		</FieldWrapper>
	  	</div>
  	);
  };

  jobInfo = () => {
    const companiesQuery = gql`
	  query GetCompanies($searchText: String!) {
	    companies(searchText: $searchText) {
		  uuid
	      name
	      photoURI
	      locations {
	        uuid
	        city {
	          name
	        }
	        country {
	          name
	        }
	      }
	    }
	  }
    `;
  	return (
  		// do you have a job?
  		<div>
  			<FieldWrapper label="Did you find a job (in the same field as your schooling) after graduation?" required={true}>
			  <input className="is-checkradio" id="hasJobYes" type="radio" name="exampleRadioDefault2" onChange={this.handleHasJob} />
			  <label htmlFor="hasJobYes">Yes</label>
			  <input className="is-checkradio" id="hasJobNo" type="radio" name="exampleRadioDefault2" onChange={this.handleHasJob} />
			  <label htmlFor="hasJobNo">No</label>
  			</FieldWrapper>

	        {
	          // Show the company if the user has already selected it
	          this.state.selectedCompany ?
              <div className="media">
                <div className="media-left image is-32x32">
                  <CompanyLogo photoURI={this.state.selectedCompany.photoURI} />
                </div>
                <div className="writeReviewSelectedSchoolName">{this.state.selectedCompany.name}</div>
                <br/><br/>
              </div> : <div/>
	        }

	        {
	          // Show the company location if the user has already selected a company
	        	(this.state.selectedCompany) ? (
		        	<FieldWrapper label={"Which " + this.state.selectedCompany.name + " location did you work at?"} required={false}>
					  	<LocationDropdown 
					  		locations={ this.state.selectedCompany.locations } 
					  		handleSelectLocation={this.handleSelectCompanyLocation} 
					  	/>
		        	</FieldWrapper>
		        ) : <div/>
	        }

	        {
	          // which company?
	        	(this.state.hasJob && !this.state.selectedCompany) ?  (
	        		<div>
	        			<label className="label"><div className="reviewFieldLabel">What company do you work for (select 'Other' if not listed)?</div></label>
				        <div className="field-body">
				        	<div className="field has-addons">
				        		<div className="control">
								    {
								    	// Dropdown -- Which company did you go to?
								    	this.state.shouldFetchCompanies ?
									       <Query
									          query={companiesQuery}
									          variables={{ searchText: this.state.companySearchText }}
									          onCompleted={data => this.updateCompanyResults(data.companies)}
									        >
									          {({ loading, error, data }) => {
									            if (loading) return <p></p>;
									            if (error) return <p>Error :(</p>;


									          	return (
									          		<FieldWrapper>
													  	<SchoolCompanyDropdown
													  		isSchoolNotCompany={false}
													  		items={data.companies} 
													  		handleSelectDropdownPress={this.handleSelectCompanyDropdownPress} 
													  		handleSelect={this.handleSelectCompany} 
													  		dropdownActive={this.state.companyDropdownActive} />
									          		</FieldWrapper>
									          	);
									          }}
									        </Query> : (
									        	<FieldWrapper>
												  	<SchoolCompanyDropdown 
													  	isSchoolNotCompany={false}
												  		items={this.state.companyResults} 
												  		handleSelectDropdownPress={this.handleSelectCompanyDropdownPress} 
												  		handleSelect={this.handleSelectCompany} 
												  		dropdownActive={this.state.companyDropdownActive} />
									        	</FieldWrapper>
									        )
								    }
				        		</div>
								<div className="control">
									{
										<input className="input" type="text" placeholder="Search for Company" onChange={this.handleUpdateCompanySearch} />
									}
								</div>
								<div className="control">
									<a className="button is-info" onClick={ this.didSearchForCompanies }>
									  Search
									</a>
								</div>
							</div>
				        </div>
				    </div>
			    ) : <div/>
	        }
	        <br/>
			{
				// when did you get the job?
				this.state.hasJob ? (
					<FieldWrapper label="When did you get your job offer?" required={false}>
					  	<MonthDropdown handleSelectMonth={this.handleSelectJobFoundMonth} />
					  	<YearDropdown handleSelectYear={this.handleSelectJobFoundYear} />
					</FieldWrapper>
				) : <div/>
			}
			{
				// salary before/after job
				this.state.hasJob ? (
					<div>
						<FieldWrapper label={"What was your salary before attending " + this.state.selectedSchool.name + "?"} required={false}>
							<SalaryDropdown defaultTitle="Salary Before" handleSelectSalary={this.handleSelectSalaryBefore} />
						</FieldWrapper>
						<FieldWrapper label={"What was your salary after getting the job?"} required={false}>
							<SalaryDropdown defaultTitle="Salary After" handleSelectSalary={this.handleSelectSalaryAfter} />
						</FieldWrapper>
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
		  <label htmlFor="termsCheckbox">I agree to the <a href='/terms' target="_blank">terms and conditions</a><br/>and have read the <a href="/privacy" target="_blank">privacy policy</a></label>
		</div>
	    <div className="buttons">
	      <a className="button is-primary" key="submit" onClick={this.handleSubmit}><strong>Submit</strong></a>
	    </div>
	  </div>
 	);
  };

}

const SchoolCompanyDropdown = ({ isSchoolNotCompany, items, handleSelectDropdownPress, handleSelect, dropdownActive }) => (
	<div className={dropdownActive ? "dropdown is-active" : "dropdown"}>
	  <div className="dropdown-trigger">
	    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu2" onClick={handleSelectDropdownPress}>
	      <span>Select</span>
	      <span className="icon is-small">
	        <i className="fas fa-angle-down" aria-hidden="true"></i>
	      </span>
	    </button>
	  </div>
	  <div className="dropdown-menu" id="dropdown-menu2" role="menu">
	    <div className="dropdown-content">
		  {
		      	items.map(
		        ({
		          uuid,
		          name,
		          photoURI
		        }, index) => (

		          <a key={uuid} className="dropdown-item" value={uuid} onClick={() => handleSelect(items[index])} >
	                  <div className="media">
	                    <div className="media-left image is-24x24">
	                    	{
	                    		isSchoolNotCompany ? <SchoolLogo photoURI={photoURI} /> : <CompanyLogo photoURI={photoURI} />
	                    	}
	                    </div>
	                    <div className="media-content">
	                      <div className="writeReviewDropdownSchoolName">{name}</div>
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

const LocationDropdown = ({ locations, handleSelectLocation }) => (
  <div className="select">
      {
		<select onChange={handleSelectLocation}>
		  <option value={'none'}>Select Location</option>
		  {
		      	locations.map(location => (
		          <option key={"location:"+location.uuid} value={location.uuid}>{location.city.name}</option>
		        ))
		  }
		</select>
    }
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

const FieldWrapper = ({label, required, children, controlStyle}) => (
	<div className="field">
		{
			label ? (
				required ? <label className="label"><div className="reviewFieldLabel required">{label}</div></label> :
					<label className="label"><div className="reviewFieldLabel">{label}</div></label>
			) : <div/>
		}
		<div className="field-body">
			<div className="control" style={controlStyle}>
				{children}
			</div>
		</div>
	</div>
);

const RatingDropdown = ({ handleSelectRating }) => (
  <div className="select">
      {
		<select onChange={handleSelectRating}>
		  <option value={'none'}>Select Rating</option>
		  {
		      	["1 (scam)", 
		      	"2 (terrible)", 
		      	"3 (bad)", 
		      	"4 (subpar)", 
		      	"5 (mediocre)",
		      	"6 (acceptable)",
		      	"7 (good)",
		      	"8 (great)",
		      	"9 (amazing)",
		      	"10 (perfect)"].map(
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
		        (salary) => (
		          <option key={"salary:"+salary.toString()} value={salary}>${numToString(salary)}</option>
		        )
		      )
		  }
		</select>
    }
  </div>
);

export default compose(withRouter, withApollo)(WriteReview)
