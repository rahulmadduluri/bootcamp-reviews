import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing.jsx';
import Search from './components/Search/Search.jsx';
import School from './components/School/School.jsx';
import Auth from './Auth/auth.jsx';

const auth = new Auth();

class App extends Component {

  state = {
    pageNumber: 0,
  	// Search Params
  	//locationUUID: 'uuid-1',
  };

  onSetSearchParams = (params) => {
  	this.setState(params);
  };

  login() {
    auth.login();
  }

  logout() {
    auth.logout();
  }

  handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      auth.handleAuthentication();
    }
  }

  componentDidMount() {
    const { renewSession } = auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }

  render() {
    const { isAuthenticated } = auth;

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
          <Route exact path="/home" render={() => <Search onSetSearchParams={this.onSetSearchParams} currentSearchParams={currentSearchParams} login={this.login}/>} />
          <Route exact path="/schools/:id" render={(props) => <School currentSearchParams={currentSearchParams} uuid={props.match.params.id}/>} />
          <Route exact path="/callback" render={(props) => {
            this.handleAuthentication(props);
            // if new user, take to new user page, otherwise back to home
            return (<Search onSetSearchParams={this.onSetSearchParams} currentSearchParams={currentSearchParams} login={this.login}/>); 
          }}/>
        </Switch>
      </div>
    );

  }
}

export default App;
