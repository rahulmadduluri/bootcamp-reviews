import React from 'react';
import './navbar.css';
import SmartSearchBar from "./searchbar.jsx";

class Navbar extends React.Component {

  onSearch = (searchText) => {
  };

  onTapLink = () => {

  };

  render() {
    return (
      <nav>
        <div className="navWide">
          <div className="searchBar">
            <SmartSearchBar />
          </div>
          <div className="navLinks">
            <a href="#">Write a Review</a>
            <a href="#">Help</a>
            <a href="#">About Us</a>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
