import React, { Component } from 'react';
import Navbar from '../navbar.jsx';
import './WriteReview.css';

class WriteReview extends Component {

  render() {
    return (
		<div>
			<Navbar />
			<div className="pageBackground">
				<div className="writeReviewInfoWrapper">
					<div className="defaultContainer column is-three-fifths">
						<div className="reviewInfoTitle">Write a Review</div>
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
						<SchoolRow />
					</div>
				</div>
				<div className="submitReviewWrapper">
					<div className="defaultContainer column is-three-fifths">
						<SubmitRow />
					</div>
				</div>
			</div>
		</div>
    );
  }
}

const SchoolRow = () => (
  <div>
	  <div className="field is-horizontal has-addons">
        <div className="field-label">
          <label className="reviewSchoolLabel">Which School Did You Attend?</label>
        </div>
	    <div className="field-body">
		      <div className="control">
		      {
		        <input className="input is-rounded" type="text" placeholder="Enter School Name"/>
		      }
		      </div>
			  <div className="control">
			    <a className="button is-info">
			      Search
			    </a>
			  </div>
		  </div>
	  </div>
    <div/>

	<div className="field is-horizontal">
	  <div className="field-label">
	    <label className="didGraduateLabel">Did You Graduate?</label>
	  </div>
	  <div className="field-body">
			<div className="field">
			  <input className="is-checkradio" id="exampleRadioInline1" type="radio" name="exampleRadioDefault" />
			  <label htmlFor="exampleRadioInline1">Yes</label>
			  <input className="is-checkradio" id="exampleRadioInline2" type="radio" name="exampleRadioDefault" />
			  <label htmlFor="exampleRadioInline2">No</label>
			</div>
	    </div>
	</div>
  </div>
);

const SubmitRow = () => (
  <div>
	<div className="field">
	  <input className="is-checkradio" id="exampleCheckbox" type="checkbox" name="exampleCheckbox" />
	  <label htmlFor="exampleCheckbox">I agree to the <a href="#">terms and conditions</a></label>
	</div>

  </div>
);

export default WriteReview;
