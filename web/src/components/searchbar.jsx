import React from 'react';
import SearchBar from 'material-ui-search-bar';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  input: {
    fontFamily: 'Rubik'
  },
});

function SmartSearchBar(props) {

  const { classes } = props;

  let searchText = "Search (Press Enter)";
  if (props.searchText) {
    searchText = props.searchText;
  }

  return(
    <SearchBar
      placeholder={searchText}
      // onChange={}
      onRequestSearch={props.onSearch}
      classes={classes}
      style={{
        margin: '0 auto'
      }}
    />
  );
}

export default withStyles(styles)(SmartSearchBar);
