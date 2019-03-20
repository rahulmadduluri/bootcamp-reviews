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

  return(
    <SearchBar
      onChange={() => console.log('onChange')}
      onRequestSearch={() => console.log('onRequestSearch')}
      classes={classes}
      style={{
        margin: '0 auto'
      }}
    />
  );
}

export default withStyles(styles)(SmartSearchBar);
