import React, { Component } from 'react';
import Navbar from '../navbar';
import './about.css';

class About extends Component {

  render() {

    return (
      <div>
      	<Navbar />
      	<div className="aboutBody column is-two-fifths">
	      	<div className="whatIsRaft">
	      		<div className="aboutTitle">What is Raft?</div>
	      		<div>
		      		Raft is a place to find the most trustworthy information about software engineering schools. 
		      		We do our best to present accurate data about each school and honest reviews from the graduates. 
		      		We know choosing a school is one of the most important decisions people make in their lives. 
		      		We want to help you make the right one.
		      	</div>
	      	</div>
	      	<br/><br/><br/>
	      	<div className="whyRaft">
	      		<div className="aboutTitle">Why Raft?</div>
	      		<div>
	      			In recent years, the University has become a rite of passage to economic freedom: complete your degree and a career will find you.
	      			Unfortunately, the well-paved road to economic freedom is increasingly obstructed by student debt and irrelevant coursework.
	      			Compared to lumbering universities, trade schools are focused, affordable, and do the job you paid them to do -- launch your career.
	      			<br/><br/>
	      			We believe the new wave of software engineering schools offer a life-changing opportunity for people to enter the growing tech industry.
	      			However, choosing a school is no simple task: How long is the coursework? Is it in-person or online-only? How many classmates will I have? What career resources are there? How will I pay?
	      			If you're searching for schools, you might feel lost in an ocean of factors to consider.
	      			<br/><br/>
	      			We started Raft to help students like you navigate these uncharted waters.
		      	</div>
	      	</div>
      	</div>
      </div>
    );
  }
}

export default About;
