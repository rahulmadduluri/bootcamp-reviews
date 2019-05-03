import React, { Component } from 'react';
import Navbar from '../navbar';
import './support.css';

class Support extends Component {

  render() {

    return (
      <div>
      	<Navbar />
      	<div className="supportBody column is-two-fifths">
	      	<div className="supportIntro">
	      		<div className="supportTitle">Need Help?</div>
	      		<div>
		      		If you are a student or school with any questions about Raft, please read the FAQ below. If you still have a question and/or concern, email us at 
		      		<a> support@raft.one</a>.
		      		We'll get back to you as soon as we can!
		      	</div>
	      	</div>
	      	<br/><br/>
	      	<div className="studentFAQ">
	      		<div className="supportTitle">Student FAQ</div>
	      		<ul>
	      			<li>How do I know the reviews are real?</li>
	      			We do a background check on every reviewer to make sure they are real people and aren't lying about the school they attended
	      			<br/><br/>
	      			<li>Why don't you show the names of the reviewers?</li>
	      			We believe that anonymity is essential to get honest reviews/information from people who don't feel comfortable making a public statement. 
	      			As a result, we take their privacy very seriously.
	      			<br/><br/>
	      			<li>I can't find a particular school I'm interested in. Why is that?</li>
	      			Raft is a new company, so we unfortunately don't have every school listed just yet. Please help us out by letting us know which school you're 
	      			interested in at <a> support@raft.one</a>
	      			<br/><br/>
	      		</ul>
	      	</div>
	      	<div className="schoolFAQ">
	      		<div className="supportTitle">School FAQ</div>
	      		<ul>
	      			<li>How can I get my school listed?</li>
	      			Please send us an email at <a> support@raft.one </a> with your school's name, a link to the website, the tuition, payment type (upfront or ISA?), 
	      			available campus locations (not required if online-only), and student to teacher ratio. We look forward to adding you to our system.
	      			<br/><br/>
	      			<li>I believe some information listed is incorrect. How can I correct you?</li>
	      			Having correct information is absolutely essential to us and we're happy to correct any mistakes on 
	      			our part. That said, we will not remove facts or reviews at a school's request unless they are verifiably incorrect/fake.
	      			<br/><br/>
	      		</ul>
	      	</div>
      	</div>
      </div>
    );
  }
}

export default Support;
