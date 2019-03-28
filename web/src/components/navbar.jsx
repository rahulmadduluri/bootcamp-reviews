import React from 'react';
import './navbar.css';
import SmartSearchBar from './searchbar.jsx';
import raftSquare from '../raft_square.png';

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
          <div className="navbar-start">
            <SmartSearchBar onSearch={this.onSearch}/>
            <a className="navbar-item">Write a Review</a>
          </div>

          <div className="navbar-end">
            <a className="navbar-item">About Us</a>
            <a className="navbar-item">Help</a>
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-primary">
                  <strong>Sign up</strong>
                </a>
                <a className="button is-light">Log in</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
