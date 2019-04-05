import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from "./components/Landing/Landing.jsx";
import Search from "./components/Search/Search.jsx";

class App extends Component {

  state = {
    pageNumber: 0,
  	// Search Params
  	//locationUUID: 'uuid-1',
  	//trackUUID: 'uuid-1'
  };

  onSetSearchParams = (params) => {
  	this.setState(params);
  };

  render() {
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
      <div className="App">
        <Switch>
          <Route exact path="/" render={() =>  <Landing onSetSearchParams={this.onSetSearchParams} /> } />
          <Route exact path="/home" render={() => <Search onSetSearchParams={this.onSetSearchParams} currentSearchParams={currentSearchParams}/>} />
        </Switch>
      </div>
    );

  	// if (this.state.page === 'Landing') {
	  //   return (
	  //     <Landing onSetSearchParams={this.onSetSearchParams} onGo={this.onLandingTransition}/>
	  //   );
  	// } else {
	  //   return (
	  //     <Search onSetSearchParams={this.onSetSearchParams} currentSearchParams={currentSearchParams}/>
	  //   );
  	// }
  }
}

export default App;
