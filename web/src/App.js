import React, { Component } from 'react';
import backgroundImage from './raft-education-background.png';
import ContainedButtons from "./components/contained_button";
import Landing from "./components/Landing.js";
import Search from "./components/Search.js";


class App extends Component {

  state = {
  	page: 'Landing'
  };

  onLandingSearch = () => {
  	this.setState({ page: 'Main' });
  };

  onMainSearch() {

  };

  render() {
  	if (this.state.page === 'Landing') {
	    return (
	      <Landing onSearch={ this.onLandingSearch }/>
	    );
  	} else {
	    return (
	      <Search />
	    );
  	}
  }
}

export default App;
