import React, { Component } from 'react';
import Landing from "./components/Landing.jsx";
import Search from "./components/Search.jsx";

class App extends Component {

  state = {
  	page: 'Landing',
  	// allSearchOptions: {
  	// 	locations: [{uuid: 'uuid-1', country:'USA', city:'ALL_CITIES'},{uuid: 'uuid-2', country:'USA', city:'San Francisco'}, {uuid: 'uuid-3', country:'France', city:'ALL_CITIES'}, {uuid: 'uuid-4', country:'France', city:'Paris'}],
  	// 	tracks: [{uuid: 'uuid-1', name: 'iOS'}, {uuid: 'uuid-2', name: 'Web'}, {uuid: 'uuid-3', name: 'Android'}]
  	// },
    
  	// add country, track, etc. here. for example:
  	//locationUUID: 'uuid-1',
  	//trackUUID: 'uuid-1'
  };

  onLandingTransition = () => {
    console.log(this.state);
  	this.setState({ page: 'Main' });
  };

  onSetSearchParams = (params) => {
  	this.setState(params);
  };

  render() {
  	if (this.state.page === 'Landing') {
	    return (
	      <Landing onSetSearchParams={this.onSetSearchParams} onGo={this.onLandingTransition}/>
	    );
  	} else {
  		const currentSearchParams = {
  			trackUUID: this.state.trackUUID
  		};
	    return (
	      <Search onSetSearchParams={this.onSetSearchParams} currentSearchParams={currentSearchParams}/>
	    );
  	}
  }
}

export default App;
