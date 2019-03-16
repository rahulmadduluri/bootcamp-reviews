import React, { Component } from 'react';
import backgroundImage from './raft-education-background.png';
import './App.css';
import ContainedButtons from "./components/contained_button";


class App extends Component {
  render() {
    return (
      <div className="App">
      	<div className="Search-Area">
	    	<div className="Title">
	            <h4>Raft</h4>
	    	</div>
	    	<div className="Subtitle">
	    		<p>trustworthy statistics and reviews for software engineering schools</p>
	    	</div>
	    	<div>
	    		<div className="Landing-Filter">
	    			<p>Select a Track</p>
	    		</div>
	    		<div className="Landing-Filter">
	    			<p>Select a Location</p>
	    		</div>
	    	</div>
	    	<ContainedButtons />
      	</div>
      	<div className="Landing">
    	</div>
      </div>
    );
  }
}

export default App;
