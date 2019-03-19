import React from 'react';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit*2,
  },
  input: {
    display: 'none',
  },
});

function ContainedButton(props) {

  const theme = createMuiTheme({
    palette: {
      primary: { main: '#3F44B5' },
    },
    typography: {
      fontFamily: "\"Rubik\"",
      fontSize: '16',
      useNextVariants: true
    }
  });

  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <Button variant="contained" color="primary" style={{ width: '200px', height:'60px', textTransform: 'none' }} onClick={props.onClick}>
          Find Schools
        </Button>
      </MuiThemeProvider>
    </div>
  );
}

export default withStyles(styles)(ContainedButton);
