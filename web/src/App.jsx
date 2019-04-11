import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import Landing from './components/Landing/Landing.jsx';
import Search from './components/Search/Search.jsx';
import School from './components/School/School.jsx';
import auth from './Auth/auth.jsx';
import NewStudent from './components/NewStudent/NewStudent.jsx';
import Callback from './components/callback.jsx';
import GuardedRoute from './GuardedRoute.jsx';

class App extends Component {

  state = {
    pageNumber: 0,
  	// Search Params
  	//locationUUID: 'uuid-1',
  };

  onSetSearchParams = (params) => {
  	this.setState(params);
  };

  // handleAuthentication = (nextState, replace) => {
  //   if (/access_token|id_token|error/.test(nextState.location.hash)) {
  //     auth.handleAuthentication();
  //   }
  // }

  async componentDidMount() {
    if (this.props.location.pathname === '/callback') return;
    try {
      await auth.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error === 'login_required') return;
      console.log(err.error);
    }
  }

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
          <Route exact path="/home" render={() => <Search onSetSearchParams={this.onSetSearchParams} currentSearchParams={currentSearchParams} />} />
          <Route exact path="/schools/:id" render={(props) => <School currentSearchParams={currentSearchParams} uuid={props.match.params.id}/>} />
          <GuardedRoute exact path="/students/new" component={NewStudent} />
          <Route exact path="/callback" component={Callback}/>
        </Switch>
      </div>
    );

  }
}

export default withRouter(App);
