import React, { Component } from 'react';
import Navbar from '../navbar.jsx';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import './WriteReview.css';
import SchoolLogo from '../Common/SchoolLogo';

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
  	const isActive = this.state.schoolDropdownActive;
  	this.setState({ schoolDropdownActive: !isActive });
  };
  handleSelectSchool = (school) => {
  	const isActive = this.state.schoolDropdownActive;
  	this.setState({ schoolDropdownActive: !isActive, schoolUUID: school.uuid, selectedSchool: school });
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
  handleTeachingRating = (score) => {
  	this.setState({ teachingScore: score });
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

  state = {
  	// state of page
  	shouldFetchSchools: true,
  	schoolSearchText: "",
  	schoolResults: [],
  	schoolDropdownActive: false,
  	selectedSchool: null,

  	// review params
  	allText: null,
  	teachingScore: null,
  	courseworkScore: null,
  	atmosphereScore: null,
  	careerPreparationScore: null,
  	didGraduate: null,
	hasJob: null,
	salaryBefore: null,
	salaryAfter: null,
	studentUUID: null,
	schoolUUID: null,
	schoolLocationUUID: null,
	jobLocationUUID: null,
	schoolGraduationMonth: null,
	schoolGraduationYear: null,
	jobStartMonth: null,
	jobStartYear: null
  };

  render() {
    return (
		<div>
			<Navbar />
			<div className="pageBackground">
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
									this.schoolReview()
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
							  		schools={this.state.schoolResults} 
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
				  	<MonthDropdown schools={schoolResults} handleSelectMonth={this.handleSelectSchoolGradMonth} />
				  	<YearDropdown schools={schoolResults} handleSelectYear={this.handleSelectSchoolGradYear} />
				  </div>
				  <div className="control">
				  </div>
			    </div>
			</div> : <div/>
		}

	  </div>  	
  	);
  };

  schoolReview = () => {
  	return (
		<div className="field">
		  <label className="label"><div className="reviewFieldLabel">How effective was the teaching?</div></label>
		  <div className="field-body">
			  <div className="control">
				<input className="slider is-fullwidth" step="1" min="0" max="10" value={this.state.teachingScore ? this.state.teachingScore : 5} type="range" onChange={this.handleTeachingRating} />
			  </div>
		    </div>
		</div>
  	);
  };

  submitInfo = () => {
 	return (
	  <div>
		<div className="field">
		  <input className="is-checkradio" id="exampleCheckbox" type="checkbox" name="exampleCheckbox" />
		  <label htmlFor="exampleCheckbox">I agree to the <a href="#">terms and conditions</a></label>
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


export default WriteReview;
