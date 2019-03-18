import React from 'react';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

function ContainedButton(props) {

  const theme = createMuiTheme({
    palette: {
      primary: { main: '#3F44B5' },
      secondary: { main: '#828282' }
    },
    typography: {
      "fontFamily": "\"Rubik\""
    }
  });

  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <Button variant="contained" color="primary" style={{ top: '40px', width: '200px', height:'50px' }} onClick={props.onClick}>
          Find Schools
        </Button>
      </MuiThemeProvider>
    </div>
  );
}

export default withStyles(styles)(ContainedButton);
