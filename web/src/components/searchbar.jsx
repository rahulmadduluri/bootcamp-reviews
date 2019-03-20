import React from 'react';
import SearchBar from 'material-ui-search-bar';
import "./searchbar.css"

function SmartSearchBar(props) {
  return(
    <SearchBar
      onChange={() => console.log('onChange')}
      onRequestSearch={() => console.log('onRequestSearch')}
      className='LOL'
      style={{
        margin: '0 auto'
      }}
    />
  );
}

export default SmartSearchBar;
