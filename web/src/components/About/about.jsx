import React, { Component } from 'react';
import Balseros from '../../images/balseros.png';
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
	      			100 years ago, society viewed the University as the uncontested home of intellectual freedom. 
	      			Today, intellectual freedom has found a new home on the Internet.
	      			For most people, the University is now a rite of passage to economic freedom: complete your degree and a career will find you.
	      			Unfortunately, the well-paved road to economic freedom is increasingly obstructed by student debt and outdated programs.
	      			Compared to lumbering universities, trade schools are nimble, affordable, and do the job you paid them to do: help you start your career.
	      			<br/><br/>
	      			We believe the wave of new software engineering schools offer a life-changing opportunity for people to enter the growing tech industry.
	      			However, not all schools are created equal: some will be online . . . others in-person; some may be project-oriented . . . others more theoretical; some will charge a flat fee . . . others only charge once you get a job.
	      			If you're searching for schools, you might feel lost in an ocean of bold claims and factors to consider.
	      			<br/><br/>
	      			We started Raft to help students like you navigate these uncharted waters.
		      	</div>
	      	</div>
		    <br/><br/><br/>
      		<img src={Balseros} alt="Balseros" />
      		<div className="balserosSubtitle">In 1994, 35,000 Cuban refugees (called Balseros) set sail on makeshift rafts in hopes of finding economic opportunity in a foreign land.</div>
      	</div>
      </div>
    );
  }
}

export default About;
