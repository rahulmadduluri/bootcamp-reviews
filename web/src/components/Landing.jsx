import React, { Component } from 'react';
import './Landing.css';
import ContainedButton from "./contained_button.jsx";
import DropdownSearch from "./dropdown_search.jsx";

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
            <DropdownSearch searchOptions={this.props.searchOptions} onSelect={this.props.onSetSearchParams}/>
          </div>
          <div className="Button-Wrapper">
            <ContainedButton onClick={this.props.onGo}/>
          </div>
        </div>
        <div className="Landing-Background">
        </div>
      </div>
    );
  }
}

export default Landing;
