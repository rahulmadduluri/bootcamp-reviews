import React, { Component } from 'react';
import './Landing.css';
import ContainedButton from "./contained_button";
import DropdownSearch from "./dropdown_search";

class Landing extends Component {

  render() {
    return (
      <div>
        <div className="Search-Area">
          <div className="Title">
                <h4>Raft</h4>
          </div>
          <div className="Subtitle">
            <p>trustworthy statistics and reviews for software engineering schools</p>
          </div>
          <div className="Landing-Filter">
            <DropdownSearch/>
          </div>
          <div className="Button-Wrapper">
            <ContainedButton onClick={this.props.onSearch}/>
          </div>
        </div>
        <div className="Landing-Background">
        </div>
      </div>
    );
  }
}

export default Landing;
