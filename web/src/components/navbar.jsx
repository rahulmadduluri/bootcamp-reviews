import React from 'react';
import './navbar.css';
import SmartSearchBar from './searchbar.jsx';
import raftSquare from '../images/raft_square.png';
import auth from '../Auth/auth.jsx';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import {withRouter} from 'react-router-dom';
import { compose } from 'recompose';

class Navbar extends React.Component {

  constructor() {
    super();

    this.state = {
      hamburgerActive: false,
    };

    this.toggleHamburgerMenu = this.toggleHamburgerMenu.bind(this);
  }

  toggleHamburgerMenu() {
    this.setState({
      hamburgerActive: !this.state.hamburgerActive,
    });
  }

  onSearch = async (searchText) => {
    const updateSchoolSearchParamsMutation = gql`
      mutation UpdateSchoolSearchParams($params:SchoolSearchParams!) {
        updateSchoolSearchParams(params: $params) @client
      }
    `;

    const params = { searchText: searchText };
    await this.props.client.mutate({
      mutation: updateSchoolSearchParamsMutation,
      variables: { params: params }
    });

    this.props.history.push('/home');
  };

  onTapLink = () => {};

  onSignInLink = () => {
    auth.login();
  };

  render() {

    const isAuthenticated = auth.isAuthenticated()
    const profile = auth.getProfile();

    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/home">
            <img src={raftSquare} alt="Logo" />
          </a>

          <div className="navbar-start searchBar">
            <SmartSearchBar searchText={this.props.searchText} onSearch={this.onSearch}/>
          </div>

          <a
            onClick={this.toggleHamburgerMenu}
            role="button"
            className={`navbar-burger burger ${
              this.state.hamburgerActive ? 'is-active' : ''
            }`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarItems"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>

        <div
          id="navbarItems"
          className={`navbar-menu ${
            this.state.hamburgerActive ? 'is-active' : ''
          }`}
        >
          <div className="navbar-end">
            <a className="navbar-item" href="/reviews/new">Write a Review</a>
            <a className="navbar-item" href="/">About</a>
            <a className="navbar-item" href="/">Support</a>
            <div className="navbar-item">
              <div className="buttons">
                {
                  ( isAuthenticated ) ? 
                  <button className="button is-primary navProfileImage" href={'/students/' + profile.studentUUID}><img src={profile.linkedInPhotoURL} alt="ProfilePhoto" /></button> :  
                  <button className="button is-primary" onClick={this.onSignInLink}><strong>Log In</strong></button>
                }
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default compose(withApollo, withRouter)(Navbar);
