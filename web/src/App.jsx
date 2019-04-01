import React, { Component } from 'react';
import Landing from "./components/Landing.jsx";
import Search from "./components/Search.jsx";

class App extends Component {

  state = {
  	page: 'Landing',
    
    pageNumber: 0,
  	// Search Params
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
        pageNumber: this.state.pageNumber,
        searchText: this.state.searchText,
        locationUUID: this.state.locationUUID,
        paymentType: this.state.paymentType,
        maxPrice: this.state.maxPrice,
        minGraduateSalary: this.state.minGraduateSalary,
        minJobPlacementRate: this.state.minJobPlacementRate,
        minLength: this.state.minLength,
        isOnline: this.state.isOnline
      };
	    return (
	      <Search onSetSearchParams={this.onSetSearchParams} currentSearchParams={currentSearchParams}/>
	    );
  	}
  }
}

export default App;
