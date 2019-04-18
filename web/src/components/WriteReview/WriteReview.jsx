import React, { Component } from 'react';
import Navbar from '../navbar.jsx';
import auth from '../../Auth/auth.jsx';
import './WriteReview.css';

class WriteReview extends Component {

  render() {

    return (
		<div>
			<Navbar />
			<div className="pageBackground">
				<div className="writeReviewInfoWrapper">
					<div className="defaultContainer column is-three-fifths">
						<div className="reviewTitle">Write a Review</div>
						<div className="reviewText">
							Hi {auth.getProfile().firstName}!<br/><br/>Thank you for taking the time to write a review. The honesty and care you pour into this review will help students just like you make a decision that will impact the rest of their lives.<br/><br/>Yours,<br/>The Raft Community
						</div>
					</div>
				</div>
				<div className="writeReviewScoreWrapper">
					<div className="defaultContainer column is-three-fifths">
						<SchoolRow />
					</div>
				</div>
			</div>
		</div>

    );
  }
}

const SchoolRow = () => (
  <div>
	  <div className="field is-horizontal">
	    <div className="field-body">
	      <div className="field-label is-normal">
	        <label className="reviewSchoolLabel">Which School Did You Attend?</label>
	      </div>
	    </div>
	    <div className="field-body">
	      <div className="control">
	      {
	        <input className="input" type="text" placeholder="Enter School Name"/>
	      }
	      </div>
	    </div>
	  </div>
    <div/>

	<div className="field is-horizontal">
	  <div className="field-label">
	    <label className="label">Did You Graduate?</label>
	  </div>
	  <div className="field-body">
	    <div className="field is-narrow">

		<div className="field">
		  <input className="is-checkradio" id="exampleRadioInline1" type="radio" name="exampleRadioDefault" />
		  <label for="exampleRadioInline1">Yes</label>
		  <input className="is-checkradio" id="exampleRadioInline2" type="radio" name="exampleRadioDefault" />
		  <label for="exampleRadioInline2">No</label>
		</div>


	    </div>
	  </div>
	</div>

	<div className="field">
	  <input className="is-checkradio" id="exampleCheckbox" type="checkbox" name="exampleCheckbox" />
	  <label for="exampleCheckbox">I agree to the <a href="#">terms and conditions</a></label>
	</div>

  </div>
);

export default WriteReview;
