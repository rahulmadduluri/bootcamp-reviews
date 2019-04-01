import React from 'react';
import './navbar.css';
import SmartSearchBar from './searchbar.jsx';
import raftSquare from '../images/raft_square.png';

class Navbar extends React.Component {

  constructor() {
    super();

    this.state = {
      hamburgerActive: false,
    };

    this.toggleHamburgerMenu = this.toggleHamburgerMenu.bind(this);
  }

  onSearch = searchText => {
    this.props.onSearch({ searchText: searchText });
  };

  onTapLink = () => {};
  toggleHamburgerMenu() {
    this.setState({
      hamburgerActive: !this.state.hamburgerActive,
    });
  }

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
            <a className="navbar-item">Write a Review</a>
            <a className="navbar-item">About Us</a>
            <a className="navbar-item">Help</a>
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-primary">
                  <strong>Student Log In</strong>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
