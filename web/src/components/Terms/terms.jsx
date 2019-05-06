import React, { Component } from 'react';
import Navbar from '../navbar';
import './terms.css';

class Terms extends Component {

  loadTerms() {
    const script = document.createElement("script");

    script.src = "https://app.termly.io/embed-policy.min.js";
    script.async = true;

    document.body.appendChild(script);
  }

  render() {

    return (
      <div>
      	<Navbar />
      	<div className="termsBody column is-two-fifths">

          <div name="termly-embed" data-id="3e54b83b-ba72-4264-a848-94ff07ce5304" data-type="iframe"></div>
          {
            this.loadTerms()
          }
        </div>
      </div>
    );
  }
}

export default Terms;
