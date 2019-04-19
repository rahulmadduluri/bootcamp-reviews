import React, { Component } from 'react';
import Navbar from '../navbar.jsx';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import './WriteReview.css';

class WriteReview extends Component {

  // handlers
  didSearchForSchools = () => {
  	this.setState({ shouldFetchSchools: true });
  };
  handleUpdateSchoolSearch = (event) => {
  	this.setState({ schoolSearchText: event.target.value });
  };
  updateSchoolResults = (schools) => {
  	this.setState({ schoolResults: schools, shouldFetchSchools: false });
  };
  handleSelectSchool = (event) => {
  	this.setState({ schoolUUID: event.target.value });
  };
  handleDidGraduate = (event) => {
  	if (event.target.id === "didGraduateYes") {
  		this.setState({ didGraduate: true });
  	} else {
  		this.setState({ didGraduate: false });
  	}
  };

  state = {
  	shouldFetchSchools: true,
  	schoolSearchText: "",
  	schoolResults: [],

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
	schoolGraduationDate: null,
	jobStartDate: null
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
				<div className="writeReviewScoreWrapper">
					<div className="defaultContainer column is-three-fifths">
						{
							this.schoolReviewInfo()
						}
					</div>
				</div>
				<div className="submitReviewWrapper">
					<div className="defaultContainer column is-three-fifths">
						{
							this.submitInfo()
						}
					</div>
				</div>
			</div>
		</div>
    );
  }

  // html components
  schoolReviewInfo = () => {
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

	const searchParams = {
      pageNumber: 0,
      searchText: this.state.schoolSearchText
	};


  	return (
	  <div>
		  <div className="field">
	        <label className="label"><div className="reviewFieldLabel">Which School Did You Attend?</div></label>
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
	    </div>

	    {
	    	this.state.shouldFetchSchools ?
		       <Query
		          query={schoolsQuery}
		          variables={{ searchParams: searchParams }}
		          onCompleted={data => this.updateSchoolResults(data.schools.schoolResults)}
		        >
		          {({ loading, error, data }) => {
		            if (loading) return <p></p>;
		            if (error) return <p>Error :(</p>;
		          	return <div/>;
		          }}
		        </Query> : (
					<div className="field">
					  <div className="field-body">
						  <div className="control">
						  	<SchoolDropdown schools={this.state.schoolResults} handleSelectSchool={this.handleSelectSchool} />
						  </div>
					  </div>
					</div>
		        )
	    	
	    }

		<div className="field">
		  <label className="label"><div className="reviewFieldLabel">Did You Graduate?</div></label>
		  <div className="field-body">
				<div className="field">
				  <input className="is-checkradio" id="didGraduateYes" type="radio" name="exampleRadioDefault" onChange={this.handleDidGraduate} />
				  <label htmlFor="exampleRadioInline1">Yes</label>
				  <input className="is-checkradio" id="didGraduateNo" type="radio" name="exampleRadioDefault" onChange={this.handleDidGraduate} />
				  <label htmlFor="exampleRadioInline2">No</label>
				</div>
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

const SchoolDropdown = ({ schools, handleSelectSchool }) => (
  <div className="select">
      {
		<select onChange={handleSelectSchool}>
		  <option>Select School</option>
		  {
		      	schools.map(
		        ({
		          uuid,
		          name
		        }) => (
		          <option key={uuid} value={uuid}>{name}</option>
		        )
		      )
		  }
		</select>
    }
  </div>
);


export default WriteReview;
