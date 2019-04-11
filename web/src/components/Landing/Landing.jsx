import React, { Component } from 'react';
import './Landing.css';
import { Redirect } from 'react-router';
import GoButton from "./go_button.jsx";


class Landing extends Component {

  state = {
    redirect: false,
  };

  onGo = () => {
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
        return <Redirect push to="/home" />;
    }

    return (
      <div>
        <div className="Search-Area">
          <div className="Title">
                <h4>Raft</h4>
          </div>
          <div className="Subtitle">
            <p>trustworthy statistics and reviews for software engineering schools</p>
          </div>
          <div className="Button-Wrapper">
            <GoButton onClick={this.onGo} />
          </div>
        </div>
        <div className="Landing-Background">
        </div>
      </div>
    );
  }
}

export default Landing;
