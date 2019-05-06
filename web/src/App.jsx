import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import Landing from './components/Landing/Landing.jsx';
import Search from './components/Search/Search.jsx';
import School from './components/School/School.jsx';
import auth from './Auth/auth.jsx';
import NewStudent from './components/NewStudent/NewStudent.jsx';
import Student from './components/Student/Student.jsx';
import WriteReview from './components/WriteReview/WriteReview.jsx';
import About from './components/About/about.jsx';
import Support from './components/Support/support.jsx';
import Privacy from './components/Privacy/privacy.jsx';
import Terms from './components/Terms/terms.jsx';
import Callback from './components/callback.jsx';
import GuardedRoute from './GuardedRoute.jsx';

class App extends Component {

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
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() =>  <Landing /> } />
          <Route exact path="/home" render={() => <Search />} />
          <Route exact path="/about" render={() => <About />} />
          <Route exact path="/support" render={() => <Support />} />
          <Route exact path="/privacy" render={() => <Privacy />} />
          <Route exact path="/terms" render={() => <Terms />} />
          <Route exact path="/schools/:uuid" render={(props) => <School uuid={props.match.params.uuid}/>} />
          <GuardedRoute exact path="/students/new" component={NewStudent} />
          <GuardedRoute exact path="/students/:uuid" component={Student} />
          <GuardedRoute exact path="/reviews/new" component={WriteReview} />
          <Route exact path="/callback" component={Callback}/>
        </Switch>
      </div>
    );

  }
}

export default withRouter(App);
