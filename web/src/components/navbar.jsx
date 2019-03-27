import React from 'react';
import './navbar.css';
import SmartSearchBar from "./searchbar.jsx";
import raftSquare from "../raft_square.png";

class Navbar extends React.Component {

  onSearch = (searchText) => {
  };

  onTapLink = () => {

  };

  render() {
    return (
      <nav>
        <div className="navWide">
          <div className="raftSquare">
            <img src={raftSquare} alt="Logo"/>
          </div>
          <div className="searchBar">
            <SmartSearchBar />
          </div>
          <div className="navLinks">
            <a href="http://www.google.com">Write a Review</a>
            <a href="http://www.google.com">Help</a>
            <a href="http://www.google.com">About Us</a>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
