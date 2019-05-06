import React, { Component } from 'react';
import Navbar from '../navbar';
import './privacy.css';

class Privacy extends Component {

  loadPrivacy() {
    const script = document.createElement("script");

    script.src = "https://app.termly.io/embed-policy.min.js";
    script.async = true;

    document.body.appendChild(script);
  }

  render() {

    return (
      <div>
      	<Navbar />
      	<div className="privacyBody column is-two-fifths">
			<div name="termly-embed" data-id="4178ff41-981c-4e75-b7d0-c604376ad488" data-type="iframe"></div>
				{
					this.loadPrivacy()
				}
			</div>
      </div>
    );
  }
}

export default Privacy;
