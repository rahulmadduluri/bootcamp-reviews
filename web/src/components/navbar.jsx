import React from 'react';
import './navbar.css';
import SmartSearchBar from './searchbar.jsx';
import raftSquare from '../images/raft_square.png';
import auth from '../Auth/auth.jsx';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';

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
    const { data } = await this.props.client.mutate({
      mutation: updateSchoolSearchParamsMutation,
      variables: { params: params }
    });
  };

  onTapLink = () => {};

  onSignInLink = () => {
    auth.login();
  };

  onSignOutLink = () => {
    auth.logout();
  };

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src={raftSquare} alt="Logo" />
          </a>

          <div className="navbar-start searchBar">
            <SmartSearchBar onSearch={this.onSearch}/>
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
            href="#"
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
            <a className="navbar-item" href="/">Write a Review</a>
            <a className="navbar-item" href="/">About</a>
            <a className="navbar-item" href="/">Support</a>
            <div className="navbar-item">
              <div className="buttons">
                {
                  ( auth.isAuthenticated() ) ? 
                  <a className="button is-primary" onClick={this.onSignOutLink}><strong>Log Out</strong></a> :  
                  <a className="button is-primary" onClick={this.onSignInLink}><strong>Log In</strong></a>
                }
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default withApollo(Navbar);
