import React, { Component } from 'react';
import Landing from "./components/Landing.js";
import Search from "./components/Search.js";


class App extends Component {

  state = {
  	page: 'Landing',
  	allSearchParams: {
  		locations: [{uuid: 'uuid-1', country:'USA', city:'ALL_CITIES'},{uuid: 'uuid-2', country:'USA', city:'San Francisco'}, {uuid: 'uuid-3', country:'France', city:'ALL_CITIES'}, {uuid: 'uuid-4', country:'France', city:'Paris'}],
  		tracks: [{uuid: 'uuid-1', name: 'iOS Development'}, {uuid: 'uuid-2', name: 'Web Development'}, {uuid: 'uuid-3', name: 'Android Development'}]
  	},
  	// add country, track, etc. here
  	locationUUID: 'uuid-1',
  	trackUUID: 'uuid-1'
  };

  onLandingSearch = () => {
  	this.setState({ page: 'Main' });
  };

  onSetSearchParams = (params) => {
  	this.setState(params);
  };

  onMainSearch() {

  };

  render() {
  	if (this.state.page === 'Landing') {
	    return (
	      <Landing searchParams={this.state.allSearchParams} onSetSearchParams={this.onSetSearchParams} onSearch={this.onLandingSearch}/>
	    );
  	} else {
  		const currentSearchParams = {
  			locationUUID: this.state.locationUUID,
  			trackUUID: this.state.trackUUID
  		};
	    return (
	      <Search searchParams={this.state.allSearchParams} onSetSearchParams={this.onSetSearchParams} currentSearchParams={currentSearchParams}/>
	    );
  	}
  }
}

export default App;
