import React, { Component } from 'react';
import backgroundImage from '../raft-education-background.png';
import '../Landing.css';
import ContainedButtons from "./contained_button";

class Landing extends Component {
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

export default Landing;
