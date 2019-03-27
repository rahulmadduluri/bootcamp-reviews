import React, { Component } from 'react';
import Landing from "./components/Landing.jsx";
import Search from "./components/Search.jsx";

class App extends Component {

  state = {
  	page: 'Landing',
    
  	// add country, track, etc. here. for example:
  	//locationUUID: 'uuid-1',
  	//trackUUID: 'uuid-1'
  };

  onLandingTransition = () => {
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
  			trackUUID: this.state.trackUUID,
        isOnline: this.state.isOnline,
        maxPrice: this.state.maxPrice,
        minGraduateSalary: this.state.minGraduateSalary,
        minJobPlacementRate: this.state.minJobPlacementRate,
        minLength: this.state.minLength
      };

	    return (
	      <Search onSetSearchParams={this.onSetSearchParams} currentSearchParams={currentSearchParams}/>
	    );
  	}
  }
}

export default App;
